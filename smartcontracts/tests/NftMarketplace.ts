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
                ethers.utils.parseEther("0.1")
            );
            const listNFTTxReceipt = await listNFTTx.wait();

            const getItem = await nftMarketplaceContract.getListing(myNFTContract.address, 0);

            expect(getItem.price).to.eq(ethers.utils.parseEther("0.1"));
            expect(getItem.seller).to.eq(acc1.address);
        });
    });


});