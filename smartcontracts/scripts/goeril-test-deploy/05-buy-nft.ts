import { connectMarketContract, connectNftContract } from './_utils';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';

dotenv.config();

const PRICE = ethers.utils.parseEther('0.05');

const main = async () => {
  const marketContract = await connectMarketContract(
    process.env.NFT_OWNER_ACCOUNT_MNEMONIC || '',
    process.env.MARKETPLACE_CONTRACT_ADDRESS || ''
  );

  const buy = await marketContract.buyItem(
    process.env.NFT_CONTRACT_ADDRESS || '',
    2,
    {
      value: PRICE,
    }
  );

  const buyTx = await buy.wait();
  console.log('Transaction complete');
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
