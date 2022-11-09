import {
  NftMarketplace__factory,
  BasicNft__factory,
} from '../../typechain-types';
import { getSigner } from './_utils';
import * as dotenv from 'dotenv';
dotenv.config();

const deployMarketPlaceContract = async () => {
  const signer = await getSigner(
    process.env.SCRIPT_01_DEPLOYER_ACCOUNT_MNEMONIC || ''
  );
  const factory = new NftMarketplace__factory(signer);
  const contract = await factory.deploy();
  await contract.deployed();
  return contract;
};

const deployNFTContract = async () => {
  const signer = await getSigner(
    process.env.SCRIPT_01_DEPLOYER_ACCOUNT_MNEMONIC || ''
  );
  const factory = new BasicNft__factory(signer);
  const contract = await factory.deploy();
  await contract.deployed();
  return contract;
};

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
