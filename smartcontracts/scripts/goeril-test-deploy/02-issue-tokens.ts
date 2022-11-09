import { connectNftContract, connectMarketContract } from './_utils';

import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();

const PRICE = ethers.utils.parseEther('0.1');

const main = async () => {
  let tokenContract = await connectNftContract(
    process.env.SCRIPT_02_TOKEN_OWNER_ACCOUNT_MNEMONIC || '',
    process.env.SCRIPT_02_NFT_CONTRACT_ADDRESS || ''
  );

  console.log(
    `Minting NFT for ${process.env.SCRIPT_02_TOKEN_OWNER_ACCOUNT_ADDRESS}`
  );
  const mintTx = await tokenContract.mintNft();
  const mintTxReceipt: any = await mintTx.wait();
  const tokenId = mintTxReceipt.events[0].args.tokenId;
  console.log(`Token ID: ${tokenId.toString()}`);

  console.log('Approving Marketplace as operator of NFT...');
  const approveTx = await tokenContract.approve(
    process.env.SCRIPT_02_MARKETPLACE_CONTRACT_ADDRESS || '',
    tokenId
  );
  await approveTx.wait();

  console.log('Listing NFT...');
  const marketContract = await connectMarketContract(
    process.env.SCRIPT_02_TOKEN_OWNER_ACCOUNT_MNEMONIC || '',
    process.env.SCRIPT_02_MARKETPLACE_CONTRACT_ADDRESS || ''
  );
  const listTx = await marketContract.listItem(
    tokenContract.address,
    tokenId,
    PRICE
  );
  await listTx.wait();
  console.log('NFT Listed with token ID: ', tokenId.toString());
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
