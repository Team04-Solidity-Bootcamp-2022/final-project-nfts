import { MyNFT } from "../typechain-types/contracts/MyNFT";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { expect } from "chai";



describe("MyNFT", async () => {

    let myNFTContract : MyNFT;
    let deployer: SignerWithAddress;
    let acc1: SignerWithAddress;
    let acc2: SignerWithAddress;
    let acc3: SignerWithAddress;
    let acc4: SignerWithAddress;
    let userAccounts: SignerWithAddress[];

    beforeEach(async () => {
        [deployer, acc1, acc2, acc3, acc4] = await ethers.getSigners();
        userAccounts = [acc1, acc2, acc3, acc4];
        const myNFTContractFactory = await ethers.getContractFactory("MyNFT");
        myNFTContract = await myNFTContractFactory.deploy();
        await myNFTContract.deployed();
    });

    describe("When the MyNFT contract is deployed", async () => {
        it("starts with total Supply 0", async () => {
            const totalSupply = await myNFTContract.totalSupply();
            expect(totalSupply).to.eq(0);
          });
    });

    describe("When NFTs are minted", async () => {
        describe("Owner mints NFTs", async () => {
            beforeEach(async () => {
                const mintTx = await myNFTContract.safeMint(acc1.address);
                const mintTxReceipt = await mintTx.wait();
            });

            it("Mints 1st NFT with right ownership and updates total supply", async () => {                
                const totalSupply = await myNFTContract.totalSupply();
                expect(totalSupply).to.eq(1);
                const ownerOfNFT0 = await myNFTContract.ownerOf(0);
                expect(ownerOfNFT0).to.eq(acc1.address);
            });
            
        });
    
        describe("User mints NFTs", async () => {
            beforeEach(async () => {
                const mintTx = await myNFTContract.connect(acc1).mint();
                const mintTxReceipt = await mintTx.wait();
            });
            it("Mints 1st NFT with right ownership and updates total supply", async () => {
                const totalSupply = await myNFTContract.totalSupply();
                expect(totalSupply).to.eq(1);
                const ownerOfNFT0 = await myNFTContract.ownerOf(0);
                expect(ownerOfNFT0).to.eq(acc1.address);
            });
            describe("Several NFTs are minted by the users", async () => {
                beforeEach(async () => {
                    const mint1Tx = await myNFTContract.connect(acc2).mint();
                    const mint1TxReceipt = await mint1Tx.wait();
                    const mint2Tx = await myNFTContract.connect(acc3).mint();
                    const mint2TxReceipt = await mint2Tx.wait();
                    const mint3Tx = await myNFTContract.connect(acc4).mint();
                    const mint3TxReceipt = await mint3Tx.wait();
                });

                it("Updates total supply accordingly", async () => {
                    const totalSupply = await myNFTContract.totalSupply();
                    expect(totalSupply).to.eq(4);    
                });

                it("gives the correct NFT TokenId on TokenOwnerByIndex", async () => {
                    for(var i=0; i < 4; i++) {
                        const TokenIdByIndex = await myNFTContract.tokenOfOwnerByIndex(userAccounts[i].address,0);
                        expect(TokenIdByIndex).to.eq(i);
                    }    
                });

                it("gives the correct NFT TokenId on tokenByIndex", async () => {
                    const totalSupply = await myNFTContract.totalSupply();
                    for(var i=0; i < totalSupply; i++) {
                        const TokenIdByIndex = await myNFTContract.tokenByIndex(i);
                        expect(TokenIdByIndex).to.eq(i);
                    }    
                });
            });
        });
    });


});