import { connectMarketContract, connectNftContract } from './_utils';
import * as dotenv from 'dotenv';
import { BigNumber } from 'ethers';
dotenv.config();

const main = async () => {
  let tokenContract = await connectNftContract(
    process.env.DEPLOYER_ACCOUNT_MNEMONIC || '',
    process.env.NFT_CONTRACT_ADDRESS || ''
  );

  const filter = tokenContract.filters.Transfer(
    null,
    process.env.NFT_OWNER_ACCOUNT_ADDRESS
  );

  let events = await tokenContract.queryFilter(filter);

  const ids: BigNumber[] = [];
  events.map(async (evt: any) => {
    const tokenId = evt.args.tokenId;
    ids.push(tokenId);
  });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
