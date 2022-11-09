import { connectMarketContract } from './_utils';
import * as dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  const marketContract = await connectMarketContract(
    process.env.SCRIPT_01_DEPLOYER_ACCOUNT_MNEMONIC || '',
    process.env.SCRIPT_02_MARKETPLACE_CONTRACT_ADDRESS || ''
  );

  const listFilter = marketContract.filters.ItemListed();
  let events = await marketContract.queryFilter(listFilter);
  console.log(events);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
