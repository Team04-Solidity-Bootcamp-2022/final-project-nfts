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

    beforeEach(async () => {
        [deployer, acc1, acc2] = await ethers.getSigners();
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


});