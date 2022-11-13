import { connectNftContract, connectMarketContract } from './_utils';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  try {
    let tokenContract = await connectNftContract(
      process.env.DEPLOYER_ACCOUNT_MNEMONIC || '',
      process.env.NFT_CONTRACT_ADDRESS || ''
    );

    const marketContract = await connectMarketContract(
      process.env.DEPLOYER_ACCOUNT_MNEMONIC || '',
      process.env.MARKETPLACE_CONTRACT_ADDRESS || ''
    );

    const totalSupply = await tokenContract.totalSupply();

    const tokensToOwners: any = [];
    for (var i = 0; i < totalSupply.toNumber(); i++) {
      const owner = await tokenContract.ownerOf(i);
      tokensToOwners.push({
        address: owner,
        tokenId: i,
      });
    }
    console.log(tokensToOwners);

    const tokensAtMarket: any = [];
    for (let tokenToOwner of tokensToOwners) {
      const atMarket = await marketContract.getListing(
        process.env.NFT_CONTRACT_ADDRESS || '',
        tokenToOwner.tokenId
      );

      if (atMarket.seller === '0x0000000000000000000000000000000000000000')
        continue;
      tokensAtMarket.push(tokenToOwner);
    }

    console.log(tokensAtMarket);
  } catch (error) {
    console.log(error);
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
