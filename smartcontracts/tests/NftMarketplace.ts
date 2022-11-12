import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { NftMarketplace } from "../typechain-types/contracts/NftMarketplace";
import { MyNFT } from "../typechain-types/contracts/MyNFT";
import { BigNumber } from "ethers";

describe("NftMarketplace", async () => {

    let nftMarketplaceContract : NftMarketplace;
    let deployer: SignerWithAddress;
    let acc1: SignerWithAddress;
    let acc2: SignerWithAddress;
    let acc3: SignerWithAddress;
    let acc4: SignerWithAddress;

    beforeEach(async () => {
        [deployer, acc1, acc2, acc3, acc4] = await ethers.getSigners();
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

    describe("Use Swap Pool", async () => {
        let myNFTContract: MyNFT;

        beforeEach(async () => {
            const myNFTContractFactory = await ethers.getContractFactory("MyNFT");
            myNFTContract = await myNFTContractFactory.deploy();
            await myNFTContract.deployed();

            const mint1Tx = await myNFTContract.safeMint(acc1.address);
            const mint1TxReceipt = await mint1Tx.wait();

            const approveTx = await myNFTContract.connect(acc1).approve(nftMarketplaceContract.address,0);
            const approveTxReceipt = approveTx.wait();
        });

        it("lists nft in swap pool", async () => {
            const listNFTTx = await nftMarketplaceContract.connect(acc1).listSwapItem(
                myNFTContract.address,
                0
            );
            const listNFTTxReceipt = await listNFTTx.wait();

            const getSwapPoolItem = await nftMarketplaceContract.getSwapPoolListing(myNFTContract.address, 0);

            const getSwapPool = await nftMarketplaceContract.getSwapPool(myNFTContract.address);

            expect(getSwapPoolItem.swapper).to.eq(acc1.address);
            expect(getSwapPool.length).to.eq(1);
        });
        describe("After 1st listing", async () => {
            beforeEach(async () => {
                const listNFTTx = await nftMarketplaceContract.connect(acc1).listSwapItem(
                    myNFTContract.address,
                    0
                );
                const listNFTTxReceipt = await listNFTTx.wait();

                const mint2Tx = await myNFTContract.safeMint(acc2.address);
                const mint2TxReceipt = await mint2Tx.wait();

                const approve2Tx = await myNFTContract.connect(acc2).approve(nftMarketplaceContract.address,1);
                const approve2TxReceipt = approve2Tx.wait();

                const mint3Tx = await myNFTContract.safeMint(acc3.address);
                const mint3TxReceipt = await mint3Tx.wait();

                const approve3Tx = await myNFTContract.connect(acc3).approve(nftMarketplaceContract.address,2);
                const approve3TxReceipt = approve3Tx.wait();
            });

            it("lists 2nd nft in swap pool", async () => {
                const listNFTTx = await nftMarketplaceContract.connect(acc2).listSwapItem(
                    myNFTContract.address,
                    1
                );
                const listNFTTxReceipt = await listNFTTx.wait();
    
                const getSwapPoolItem = await nftMarketplaceContract.getSwapPoolListing(myNFTContract.address, 1);
    
                const getSwapPool = await nftMarketplaceContract.getSwapPool(myNFTContract.address);
    
                expect(getSwapPoolItem.swapper).to.eq(acc2.address);
                expect(getSwapPool.length).to.eq(2);
            });

            it("Swaps NFTs with a Pool of length 2", async () => {
                const listNFTTx = await nftMarketplaceContract.connect(acc2).listSwapItem(
                    myNFTContract.address,
                    1
                );
                const listNFTTxReceipt = await listNFTTx.wait();
                
                const randomNFTSwapTx = await nftMarketplaceContract.connect(acc1).randomNFTSwap(
                    myNFTContract.address,
                    0
                );
                const randomNFTSwapTxReceipt = await randomNFTSwapTx.wait();
    
                const getOwnerOfNFT0 = await myNFTContract.ownerOf(0);
    
                const getOwnerOfNFT1 = await myNFTContract.ownerOf(1);
                
                expect(getOwnerOfNFT0).to.eq(acc2.address);
                expect(getOwnerOfNFT1).to.eq(acc1.address);
                
                const getSwapPoolItem0 = await nftMarketplaceContract.getSwapPoolListing(myNFTContract.address, 0);
                const getSwapPoolItem1 = await nftMarketplaceContract.getSwapPoolListing(myNFTContract.address, 1);
    
                const getSwapPool = await nftMarketplaceContract.getSwapPool(myNFTContract.address);

                expect(getSwapPoolItem0.swapper).to.eq(ethers.constants.AddressZero);
                expect(getSwapPoolItem1.swapper).to.eq(ethers.constants.AddressZero);
                expect(getSwapPool.length).to.eq(0);

            });

            it("Swaps NFTs with a Pool of length > 2", async () => {
                const listNFT1Tx = await nftMarketplaceContract.connect(acc2).listSwapItem(
                    myNFTContract.address,
                    1
                );
                const listNFT1TxReceipt = await listNFT1Tx.wait();

                const listNFT2Tx = await nftMarketplaceContract.connect(acc3).listSwapItem(
                    myNFTContract.address,
                    2
                );
                const listNFT2TxReceipt = await listNFT2Tx.wait();
                
                const getSwapPoolBefore = await nftMarketplaceContract.getSwapPool(myNFTContract.address);
                expect(getSwapPoolBefore.length).to.eq(3);

                const randomNFTSwapTx = await nftMarketplaceContract.connect(acc2).randomNFTSwap(
                    myNFTContract.address,
                    1
                );
                const randomNFTSwapTxReceipt = await randomNFTSwapTx.wait();
    
                const getOwnerOfNFT0 = await myNFTContract.ownerOf(0);
    
                const getOwnerOfNFT1 = await myNFTContract.ownerOf(1);
    
                const getOwnerOfNFT2 = await myNFTContract.ownerOf(2);
                
                expect(getOwnerOfNFT1).to.not.eq(acc2.address);
                expect(acc2.address).to.be.oneOf([getOwnerOfNFT0, getOwnerOfNFT2]);

                const getSwapPoolItem1 = await nftMarketplaceContract.getSwapPoolListing(myNFTContract.address, 1);
    
                const getSwapPool = await nftMarketplaceContract.getSwapPool(myNFTContract.address);

                expect(getSwapPoolItem1.swapper).to.eq(ethers.constants.AddressZero);
                expect(getSwapPool.length).to.eq(1);

            });

        });


    });


});