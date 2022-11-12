import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { NftMarketplace, BasicNFT } from "../typechain-types";
import { MyNFT } from "../typechain-types";
import { BigNumber } from "ethers";
import { token } from "../typechain-types/@openzeppelin/contracts";

describe("NftMarketplace", async () => {

    let nftMarketplaceContract : NftMarketplace;
    let deployer: SignerWithAddress;
    let acc1: SignerWithAddress;
    let acc2: SignerWithAddress;
    let acc3: SignerWithAddress;
    let acc4: SignerWithAddress;
    let owner1: SignerWithAddress;  // owner of NFT
    let owner2: SignerWithAddress;  // owner 2 of NFT
    let buyer1: SignerWithAddress;
    let buyer2: SignerWithAddress;
    let buyer3: SignerWithAddress;

    beforeEach(async () => {
        [deployer, acc1, acc2, acc3, acc4, owner1, owner2, buyer1, buyer2, buyer3] = await ethers.getSigners();
        const nftMarketplaceContractFactory = await ethers.getContractFactory("NftMarketplace");
        nftMarketplaceContract = await nftMarketplaceContractFactory.deploy();
        await nftMarketplaceContract.deployed();
    });

    describe("When the NftMarketplace contract is deployed", async () => {
        it("starts with 0 proceeds", async () => {
            const amount = await nftMarketplaceContract.getProceeds(nftMarketplaceContract.address);
            expect(amount).to.eq(0);
          });
    });

    describe("Listing NFTs", async () => {
        let myNFTContract: MyNFT;
        const NFT_PRICE_WEI = ethers.utils.parseEther("0.1");

        beforeEach(async () => {
            const myNFTContractFactory = await ethers.getContractFactory("MyNFT");
            myNFTContract = await myNFTContractFactory.deploy();
            await myNFTContract.deployed();

            const mintTx = await myNFTContract.safeMint(acc1.address);
            const mintTxReceipt = await mintTx.wait();

            const approveTx = await myNFTContract.connect(acc1).approve(nftMarketplaceContract.address,0);
            const approveTxReceipt = approveTx.wait();
        });

        it("lists NFT with correct price", async () => {
            const listNFTTx = await nftMarketplaceContract.connect(acc1).listItem(
                myNFTContract.address,
                0,
                NFT_PRICE_WEI
            );
            const listNFTTxReceipt = await listNFTTx.wait();

            const getItem = await nftMarketplaceContract.getListing(myNFTContract.address, 0);

            expect(getItem.price).to.eq(NFT_PRICE_WEI);
            expect(getItem.seller).to.eq(acc1.address);
        });

        describe("After 1st listing", async () => {
            beforeEach(async () => {
                const listNFTTx = await nftMarketplaceContract.connect(acc1).listItem(
                    myNFTContract.address,
                    0,
                    NFT_PRICE_WEI
                );
                const listNFTTxReceipt = await listNFTTx.wait();
            });

            it("delists NFT", async () => {
                const cancelListingTx = await nftMarketplaceContract.connect(acc1).cancelListing(
                  myNFTContract.address,
                  0  
                );
                
                const getItem = await nftMarketplaceContract.getListing(myNFTContract.address, 0);
    
                expect(getItem.seller).to.eq(ethers.constants.AddressZero);
            });

            describe("Buy NFT", async () => {
                let gasFeesBuyNFT: BigNumber;
                let balanceBeforeBuyNFT: BigNumber;
                let balanceSellerBeforeBuyNFT: BigNumber;
                beforeEach(async () => {
                    balanceBeforeBuyNFT = await acc2.getBalance();
                    balanceSellerBeforeBuyNFT = await acc1.getBalance();
                    const buyNFTTx = await nftMarketplaceContract.connect(acc2).buyItem(
                        myNFTContract.address,
                        0,
                        {value: NFT_PRICE_WEI}
                    );
                    const buyNFTTxReceipt = await buyNFTTx.wait();

                    const gasUsedBuyNFT = buyNFTTxReceipt.gasUsed;
                    const gasPriceBuyNFT = buyNFTTxReceipt.effectiveGasPrice;
                    gasFeesBuyNFT = gasUsedBuyNFT.mul(gasPriceBuyNFT);
                });

                it("takes the correct amount of ETH", async () => {
                    const balanceAfterBuyNFT = await acc2.getBalance();
                    const diff = balanceBeforeBuyNFT.sub(balanceAfterBuyNFT).abs();
                    const expectDiff = NFT_PRICE_WEI.add(gasFeesBuyNFT);
                    const error = diff.sub(expectDiff);
                    expect(error).to.eq(0);
                });

                it("updates proceeds accordingly", async () => {
                    const getProceedsAcc1 = await nftMarketplaceContract.getProceeds(acc1.address);
                    expect(getProceedsAcc1).to.eq(NFT_PRICE_WEI);
                });

                it("withdraws correct amount proceeds", async () => {
                    const withdrawProceedsAcc1Tx = await nftMarketplaceContract.connect(acc1).withdrawProceeds();
                    const withdrawProceedsAcc1TxReceipt = await withdrawProceedsAcc1Tx.wait();

                    const gasUsedWithdraw = withdrawProceedsAcc1TxReceipt.gasUsed;
                    const gasPriceWithdraw = withdrawProceedsAcc1TxReceipt.effectiveGasPrice;
                    const gasFeesWithdraw = gasUsedWithdraw.mul(gasPriceWithdraw);

                    const balanceSellerAfterWithdraw = await acc1.getBalance();
                    const diff = balanceSellerBeforeBuyNFT.sub(balanceSellerAfterWithdraw).abs();
                    const expectDiff = NFT_PRICE_WEI.sub(gasFeesWithdraw);
                    const error = diff.sub(expectDiff);
                    expect(error).to.eq(0);
                });
            });
        });
    });

    describe("Swap NFTs", async () => {
        let myNFTContract: MyNFT;
        const NFT_PRICE_WEI = ethers.utils.parseEther("0.1");

        const LISTING_PRICE = ethers.utils.parseEther("0.1");
        const LISTING_PRICE_TWO = ethers.utils.parseEther("0.2");
        const LISTING_PRICE_THREE = ethers.utils.parseEther("0.3");
        const LISTING_PRICE_x10 = ethers.utils.parseEther("1");
        const LISTING_PRICE_TWO_x10 = ethers.utils.parseEther("2");
        const LISTING_PRICE_THREE_x10 = ethers.utils.parseEther("3");

        const tokenId = 0;
        const token2Id = 1;
        const token3Id = 2;

        beforeEach(async () => {
            const myNFTContractFactory = await ethers.getContractFactory("MyNFT");
            myNFTContract = await myNFTContractFactory.deploy();
            await myNFTContract.deployed();

            const mintTx = await myNFTContract.safeMint(buyer1.address);
            const mintTxReceipt = await mintTx.wait();
            const approveTx = await myNFTContract.connect(buyer1).approve(nftMarketplaceContract.address, tokenId);
            const approveTxReceipt = approveTx.wait();

            const mint2Tx = await myNFTContract.safeMint(buyer2.address);
            const mint2TxReceipt = await mint2Tx.wait();
            const approve2Tx = await myNFTContract.connect(buyer2).approve(nftMarketplaceContract.address, token2Id);
            const approve2TxReceipt = approve2Tx.wait();

            const mint3Tx = await myNFTContract.safeMint(buyer3.address);
            const mint3TxReceipt = await mint3Tx.wait();
            const approve3Tx = await myNFTContract.connect(buyer3).approve(nftMarketplaceContract.address, token3Id);
            const approve3TxReceipt = approve3Tx.wait();
           
        });

        describe("After minting of NFTs", async () => {
            beforeEach("Should let owners list NFT with correct price", async() => {
                const newListingTx = await nftMarketplaceContract
                    .connect(buyer1)
                    .listItem(myNFTContract.address, tokenId, LISTING_PRICE_x10);
                await newListingTx.wait();
                const getItem = await nftMarketplaceContract.getListing(myNFTContract.address, tokenId);
                expect(getItem.price).to.eq(LISTING_PRICE_x10);
                expect(getItem.seller).to.eq(buyer1.address);

                const newListing2Tx = await nftMarketplaceContract
                    .connect(buyer2)
                    .listItem(myNFTContract.address, token2Id, LISTING_PRICE_TWO_x10);
                await newListing2Tx.wait();
                const getItem2 = await nftMarketplaceContract.getListing(myNFTContract.address, token2Id);
                expect(getItem2.price).to.eq(LISTING_PRICE_TWO_x10);
                expect(getItem2.seller).to.eq(buyer2.address);

                const newListing3Tx = await nftMarketplaceContract
                    .connect(buyer3)
                    .listItem(myNFTContract.address, token3Id, LISTING_PRICE_THREE_x10);
                await newListing3Tx.wait();
                const getItem3 = await nftMarketplaceContract.getListing(myNFTContract.address, token3Id);
                expect(getItem3.price).to.eq(LISTING_PRICE_THREE_x10);
                expect(getItem3.seller).to.eq(buyer3.address);
            });

            describe("Make swap offers", async() => {
                it("Should let owners make swap offers for NFT 1", async () => {
                    const swapOfferTx = await nftMarketplaceContract
                        .connect(buyer2)
                        .makeSwapOffer(myNFTContract.address, tokenId, myNFTContract.address, token2Id);
                    await swapOfferTx.wait();

                    const swapOffer2Tx = await nftMarketplaceContract
                        .connect(buyer3)
                        .makeSwapOffer(myNFTContract.address, tokenId, myNFTContract.address, token3Id);
                    await swapOffer2Tx.wait();

                    const getSwapOffersForNftTx = await nftMarketplaceContract.getSwapOffersForNft(
                        myNFTContract.address, tokenId
                    );

                    expect(getSwapOffersForNftTx.length).to.eq(2);

                    expect(getSwapOffersForNftTx[0].swapper).to.eq(buyer2.address);
                    expect(getSwapOffersForNftTx[0].swapNftAddress).to.eq(myNFTContract.address);
                    expect(getSwapOffersForNftTx[0].swapTokenId).to.eq(token2Id);

                    expect(getSwapOffersForNftTx[1].swapper).to.eq(buyer3.address);
                    expect(getSwapOffersForNftTx[1].swapNftAddress).to.eq(myNFTContract.address);
                    expect(getSwapOffersForNftTx[1].swapTokenId).to.eq(token3Id);
                });

                it("Should let Buyer 1 approve a swap offer from Buyer 2", async () => {
                    const swapOfferTx = await nftMarketplaceContract
                        .connect(buyer2)
                        .makeSwapOffer(myNFTContract.address, tokenId, myNFTContract.address, token2Id);
                    await swapOfferTx.wait();

                    const swapOffer2Tx = await nftMarketplaceContract
                        .connect(buyer3)
                        .makeSwapOffer(myNFTContract.address, tokenId, myNFTContract.address, token3Id);
                    await swapOffer2Tx.wait();

                    const approveSwapTx = await nftMarketplaceContract
                        .connect(buyer1)
                        .approveSwap(
                            buyer2.address,
                            myNFTContract.address,
                            myNFTContract.address,
                            tokenId,
                            token2Id
                        );
                    await approveSwapTx.wait();

                    const newOwnerNft1 = await myNFTContract.ownerOf(tokenId);
                    const newOwnerNft2 = await myNFTContract.ownerOf(token2Id);
                    expect(newOwnerNft1).to.eq(buyer2.address);
                    expect(newOwnerNft2).to.eq(buyer1.address);
                });

                it("Should not let Buyer 1 approve a swap offer from Buyer 2 after cancelled swap offer", async () => {
                    const swapOfferTx = await nftMarketplaceContract
                        .connect(buyer2)
                        .makeSwapOffer(myNFTContract.address, tokenId, myNFTContract.address, token2Id);
                    await swapOfferTx.wait();

                    const swapOffer2Tx = await nftMarketplaceContract
                        .connect(buyer3)
                        .makeSwapOffer(myNFTContract.address, tokenId, myNFTContract.address, token3Id);
                    await swapOffer2Tx.wait();

                    const cancelSwapTx = await nftMarketplaceContract
                        .connect(buyer2)
                        .cancelSwapOffer(
                            myNFTContract.address,
                            myNFTContract.address,
                            tokenId,
                            token2Id
                        );
                    await cancelSwapTx.wait()

                    await expect(nftMarketplaceContract
                        .connect(buyer1)
                        .approveSwap(
                            buyer2.address,
                            myNFTContract.address,
                            myNFTContract.address,
                            tokenId,
                            token2Id
                        )).to.be.reverted;
                });
            });
        });
    });
});
