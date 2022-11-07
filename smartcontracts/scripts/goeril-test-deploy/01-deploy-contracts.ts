import { ethers } from 'ethers';
import { NftMarketplace__factory } from '../../typechain-types';
import { MyNFT__factory } from '../../typechain-types';
import * as dotenv from 'dotenv';
dotenv.config();

const getSigner = () => {
  const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: process.env.INFURA_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
  };
  const provider = ethers.getDefaultProvider('goerli', options);
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? '');
  console.log(`Using address ${wallet.address}`);
  const signer = wallet.connect(provider);
  return signer;
};

const deployMarketPlaceContract = async () => {
  const signer = await getSigner();
  const factory = new NftMarketplace__factory(signer);
  const contract = await factory.deploy();
  await contract.deployed();
  return contract;
};

const deployNFTContract = async () => {
  const signer = await getSigner();
  const factory = new MyNFT__factory(signer);
  const contract = await factory.deploy();
  await contract.deployed();
  return contract;
};

const main = async () => {
  const marketplace = await deployMarketPlaceContract();
  const token = await deployNFTContract();
  console.log(marketplace.address);
  console.log(token.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
