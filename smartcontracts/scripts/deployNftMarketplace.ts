import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as dotenv from "dotenv";

import { NftMarketplace, BasicNft } from "../typechain-types";

dotenv.config();

const LISTING_PRICE = ethers.utils.parseEther("0.1");
const LISTING_PRICE_TWO = ethers.utils.parseEther("0.2");
const LISTING_PRICE_THREE = ethers.utils.parseEther("0.3");
const LISTING_PRICE_x10 = ethers.utils.parseEther("1");
const LISTING_PRICE_TWO_x10 = ethers.utils.parseEther("2");
const LISTING_PRICE_THREE_x10 = ethers.utils.parseEther("3");
const BUY_TOKEN_ID = 0;
const SWAP_PRICE = ethers.utils.parseEther("0");

let nftMarketplaceContract: NftMarketplace;
let basicNftContract: BasicNft;
let accounts: SignerWithAddress;

async function main() {

  const accounts = await ethers.getSigners();
  const [deployer, owner, owner2, buyer, buyer2, buyer3] = accounts;

  // Deploy NFT Marketplace Contract
  const nftMarketplaceContractFactory = await ethers.getContractFactory("NftMarketplace");
  nftMarketplaceContract = await nftMarketplaceContractFactory.deploy();
  await nftMarketplaceContract.deployed();

  // Deploy example NFT contracts
  console.log(`Deploy BasicNFT Contract`);

  const basicNftContractFactory = await ethers.getContractFactory("BasicNft");
  basicNftContract = await basicNftContractFactory.deploy();
  await basicNftContract.deployed();

  // Mint NFT 1
  console.log(`Minting NFT 1 for ${owner.address}`);
  const mintTx = await basicNftContract.connect(owner).mintNft();
  const mintTxReceipt = await mintTx.wait();
  let tokenId: any;
  if (mintTxReceipt.events) {
    tokenId = mintTxReceipt.events[0].args?.tokenId;
  }
  console.log(`Minted tokenId ${tokenId}`);

  // Mint NFT 2
  console.log(`Minting NFT 2 for ${owner2.address}`);
  const mint2Tx = await basicNftContract.connect(owner2).mintNft();
  const mint2TxReceipt = await mint2Tx.wait();
  let token2Id: any;
  if (mint2TxReceipt.events) {
    token2Id = mint2TxReceipt.events[0].args?.tokenId;
  }
  console.log(`Minted token2Id ${token2Id}`);

  // Mint NFT 3
  console.log(`Minting NFT 3 for ${owner.address}`);
  const mint3Tx = await basicNftContract.connect(owner).mintNft();
  const mint3TxReceipt = await mint3Tx.wait();
  let token3Id: any;
  if (mint3TxReceipt.events) {
    token3Id = mint3TxReceipt.events[0].args?.tokenId;
  }
  console.log(`Minted token3Id ${token3Id}`);

  // Approve marketplace  
  console.log(`Approve Marketplace as operator for NFT tokenId: ${tokenId}`);
  const approvalTx = await basicNftContract
    .connect(owner)
    .approve(nftMarketplaceContract.address, tokenId);
  await approvalTx.wait(1);

  console.log(`Approve Marketplace as operator for NFT tokenId: ${token2Id}`);
  const approval2Tx = await basicNftContract
    .connect(owner2)
    .approve(nftMarketplaceContract.address, token2Id);
  await approval2Tx.wait(1);

  console.log(`Approve Marketplace as operator for NFT tokenId: ${token3Id}`);
  const approval3Tx = await basicNftContract
    .connect(owner)
    .approve(nftMarketplaceContract.address, token3Id);
  await approval3Tx.wait(1);

  // List NFTs
  console.log('Listing NFT 1 to NFT Marketplace');
  const listingTx = await nftMarketplaceContract
    .connect(owner)
    .listItem(basicNftContract.address, tokenId, LISTING_PRICE);
  await listingTx.wait(1);
  console.log(`NFT 1 with tokenId ${tokenId} listed`);

  const mintedBy = await basicNftContract.ownerOf(tokenId);
  console.log(`NFT with ${tokenId} minted and listed by owner ${mintedBy}`);

  console.log('Listing NFT 2 to NFT Marketplace');
  const listing2Tx = await nftMarketplaceContract
    .connect(owner2)
    .listItem(basicNftContract.address, token2Id, LISTING_PRICE_TWO);
  await listing2Tx.wait(1);
  console.log(`NFT 2 with tokenId ${token2Id} listed`);

  const minted2By = await basicNftContract.ownerOf(token2Id);
  console.log(`NFT with ${token2Id} minted and listed by owner ${minted2By}`);

  console.log('Listing NFT 3 to NFT Marketplace');
  const listing3Tx = await nftMarketplaceContract
    .connect(owner)
    .listItem(basicNftContract.address, token3Id, LISTING_PRICE_THREE);
  await listing3Tx.wait(1);
  console.log(`NFT 3 with tokenId ${token3Id} listed`);

  const minted3By = await basicNftContract.ownerOf(token3Id);
  console.log(`NFT with ${token3Id} minted and listed by owner ${minted3By}`);

  // Get listing
  console.log(`Get listing for ${tokenId}`);
  const getListingTx = await nftMarketplaceContract.getListing(
    basicNftContract.address, tokenId
  );
  console.log(`Seller: ${ getListingTx.seller }`);
  console.log(`Price: ${ ethers.utils.formatEther(getListingTx.price) }`);

  console.log(`Get listing for ${token2Id}`);
  const getListing2Tx = await nftMarketplaceContract.getListing(
    basicNftContract.address, token2Id
  );
  console.log(`Seller: ${ getListing2Tx.seller }`);
  console.log(`Price: ${ ethers.utils.formatEther(getListing2Tx.price) }`);

  console.log(`Get listing for ${token3Id}`);
  const getListing3Tx = await nftMarketplaceContract.getListing(
    basicNftContract.address, token3Id
  );
  console.log(`Seller: ${ getListing3Tx.seller }`);
  console.log(`Price: ${ ethers.utils.formatEther(getListing3Tx.price) }`);

  // Buyer 1 to buy NFT 1
  const buyTx = await nftMarketplaceContract
    .connect(buyer)
    .buyItem(basicNftContract.address, tokenId, {value: getListingTx.price});
  await buyTx.wait(1);
  console.log(`NFT tokenId ${tokenId} bought by buyer: ${buyer.address}`);

  // Buyer 2 to buy NFT 2
  const buy2Tx = await nftMarketplaceContract
  .connect(buyer2)
    .buyItem(basicNftContract.address, token2Id, {value: getListing2Tx.price});
  await buy2Tx.wait(1);
  console.log(`NFT tokenId ${token2Id} bought by buyer: ${buyer2.address}`);

  // Buyer 3 to buy NFT 3
  const buy3Tx = await nftMarketplaceContract
  .connect(buyer3)
    .buyItem(basicNftContract.address, token3Id, {value: getListing3Tx.price});
  await buy3Tx.wait(1);
  console.log(`NFT tokenId ${token3Id} bought by buyer: ${buyer3.address}`);

  const newOwner = await basicNftContract.ownerOf(tokenId);
  console.log(`New owner of tokenId ${tokenId} is ${newOwner}`);

  const newOwner2 = await basicNftContract.ownerOf(token2Id);
  console.log(`New owner of tokenId ${token2Id} is ${newOwner2}`)

  const newOwner3 = await basicNftContract.ownerOf(token3Id);
  console.log(`New owner of tokenId ${token3Id} is ${newOwner3}`)

  // Proceeds of seller
  const proceedsTx = await nftMarketplaceContract.getProceeds(owner.address);
  console.log(`Proceeds of seller ${owner.address}: ${ethers.utils.formatEther(proceedsTx) }`);

  // Proceeds of seller 2
  const proceeds2Tx = await nftMarketplaceContract.getProceeds(owner2.address);
  console.log(`Proceeds of seller ${owner2.address}: ${ethers.utils.formatEther(proceeds2Tx) }`);

  // New Owner 1 Approves NFT Marketplace
  console.log(`New Owner approve Marketplace as operator for NFT tokenId: ${tokenId}`);
  const newApprovalTx = await basicNftContract
    .connect(buyer)
    .approve(nftMarketplaceContract.address, tokenId);
  await newApprovalTx.wait(1);

  // New Owner 2 Approves NFT Marketplace
  console.log(`New Owner 2 approve Marketplace as operator for NFT tokenId: ${token2Id}`);
  const newApproval2Tx = await basicNftContract
    .connect(buyer2)
    .approve(nftMarketplaceContract.address, token2Id);
  await newApproval2Tx.wait(1);

  // New Owner 3 Approves NFT Marketplace
  console.log(`New Owner 3 approve Marketplace as operator for NFT tokenId: ${token3Id}`);
  const newApproval3Tx = await basicNftContract
    .connect(buyer3)
    .approve(nftMarketplaceContract.address, token3Id);
  await newApproval3Tx.wait(1);

  // New Buyer 1 lists NFT 1
  console.log('Listing NFT 1 with new owner to NFT Marketplace');
  const newListingTx = await nftMarketplaceContract
    .connect(buyer)
    .listItem(basicNftContract.address, tokenId, LISTING_PRICE_x10);
  await newListingTx.wait(1);
  console.log(`NFT 1 with tokenId ${tokenId} listed`);

  // New Buyer 2 lists NFT 2
  console.log('Listing NFT 2 with new owner to NFT Marketplace');
  const newListing2Tx = await nftMarketplaceContract
    .connect(buyer2)
    .listItem(basicNftContract.address, token2Id, LISTING_PRICE_TWO_x10);
  await newListing2Tx.wait(1);
  console.log(`NFT 2 with tokenId ${token2Id} listed`);

  // New Buyer 3 lists NFT 3
  console.log('Listing NFT 3 with new owner to NFT Marketplace');
  const newListing3Tx = await nftMarketplaceContract
    .connect(buyer3)
    .listItem(basicNftContract.address, token3Id, LISTING_PRICE_THREE_x10);
  await newListing3Tx.wait(1);
  console.log(`NFT 3 with tokenId ${token3Id} listed`);

  // Buyer 2 makes swap offer for NFT 1 to Buyer 1
  console.log('Buyer 2 makes swap offer for NFT 1');
  const swapOfferTx = await nftMarketplaceContract
    .connect(buyer2)
    .makeSwapOffer(basicNftContract.address, tokenId, basicNftContract.address, token2Id);
  await swapOfferTx.wait(1);

  // Buyer 3 makes swap offer for NFT 1 to Buyer 1
  console.log('Buyer 3 makes swap offer for NFT 1');
  const swapOffer2Tx = await nftMarketplaceContract
    .connect(buyer3)
    .makeSwapOffer(basicNftContract.address, tokenId, basicNftContract.address, token3Id);
  await swapOffer2Tx.wait(1);

  // Get swap offers
  console.log(`Get swap offers for NFT ${basicNftContract.address} tokenId ${tokenId}`);
  const getSwapOffersForNftTx = await nftMarketplaceContract.getSwapOffersForNft(
    basicNftContract.address, tokenId
  );
  for (let i = 0; i < getSwapOffersForNftTx.length; i++) {
    console.log(`Swap offer #${i}`);
    console.log(`swapper: ${getSwapOffersForNftTx[i].swapper}`);
    console.log(`swapNftAddress: ${getSwapOffersForNftTx[i].swapNftAddress}`);
    console.log(`swapTokenId: ${getSwapOffersForNftTx[i].swapTokenId}`);
  }

  // Buyer 1 approves swap to Buyer 2
  const swapper = getSwapOffersForNftTx[0].swapper;
  const swapNftAddress = getSwapOffersForNftTx[0].swapNftAddress;
  const swapTokenId = getSwapOffersForNftTx[0].swapTokenId;

  console.log(`Buyer 1 approve swap to Buyer 2 ${swapper}`);
  const approveSwapTx = await nftMarketplaceContract
    .connect(buyer)
    .approveSwap(
      buyer2.address,
      basicNftContract.address,
      swapNftAddress,
      tokenId,
      swapTokenId
    );
  await approveSwapTx.wait(1);

  const newOwnerNft1 = await basicNftContract.ownerOf(tokenId);
  console.log(`New owner of tokenId ${tokenId} is ${newOwnerNft1}`);

  const newOwnerNft2 = await basicNftContract.ownerOf(swapTokenId);
  console.log(`New owner of tokenId ${swapTokenId} is ${newOwnerNft2}`)


  // // Attempt for Buyer 1 to approve swap to Buyer 3 (will revert)
  // const swapper2 = getSwapOffersForNftTx[1].swapper;
  // const swapNft2Address = getSwapOffersForNftTx[1].swapNftAddress;
  // const swapToken2Id = getSwapOffersForNftTx[1].swapTokenId;

  // console.log(`Buyer 1 approve swap to Buyer 3${swapper}`);
  // const approveSwap2Tx = await nftMarketplaceContract
  //   .connect(buyer)
  //   .approveSwap(
  //     buyer3.address,
  //     basicNftContract.address,
  //     swapNft2Address,
  //     tokenId,
  //     swapToken2Id
  //   );
  // await approveSwap2Tx.wait(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
