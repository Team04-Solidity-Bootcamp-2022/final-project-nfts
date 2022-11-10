import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { MyNFT__factory, NftMarketplace__factory } from '../../typechain-types';
dotenv.config();

const getSigner = (mnemonic: string) => {
  const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: process.env.INFURA_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
  };
  const provider = ethers.getDefaultProvider('goerli', options);
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  console.log(`Using address ${wallet.address}`);
  const signer = wallet.connect(provider);
  return signer;
};

const connectNftContract = async (mnemonic: string, address: string) => {
  const signer = await getSigner(mnemonic);
  const factory = new MyNFT__factory(signer);
  const contract = await factory.attach(address);
  return contract;
};

const connectMarketContract = async (mnemonic: string, address: string) => {
  const signer = await getSigner(mnemonic);
  const factory = new NftMarketplace__factory(signer);
  const contract = await factory.attach(address);
  return contract;
};

export { getSigner, connectNftContract, connectMarketContract };
