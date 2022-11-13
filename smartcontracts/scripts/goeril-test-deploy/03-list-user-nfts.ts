import { connectNftContract } from './_utils';
import * as dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  try {

    let tokenContract = await connectNftContract(
      process.env.NFT_OWNER_ACCOUNT_MNEMONIC || '',
      process.env.NFT_CONTRACT_ADDRESS || ''
    );
  
    const balance = await tokenContract.balanceOf(
      process.env.NFT_OWNER_ACCOUNT_ADDRESS || ''
    );
    const cleanBalance = balance.toNumber();
  
    const tokens = [];
    for (var i = 0; i < cleanBalance; i++) {
      const tokenId = await tokenContract.tokenOfOwnerByIndex(
        process.env.NFT_OWNER_ACCOUNT_ADDRESS || '',
        i
      );
      tokens.push(tokenId);
    }
    console.log(tokens);
  } catch (error) {
    console.log(error);
  }


};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
