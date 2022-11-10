import { deployNFTContract, deployMarketPlaceContract } from './_utils';
import * as dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  const marketplace = await deployMarketPlaceContract();
  const token = await deployNFTContract();
  console.log(`MARKETPLACE CONTRACT ADDRESS: ${marketplace.address}`);
  console.log(`NFT CONTRACT ADDRESS: ${token.address}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
