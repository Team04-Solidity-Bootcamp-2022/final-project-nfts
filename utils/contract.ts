import { ethers } from 'ethers';

const getSigner = (key: string) => {
  const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: process.env.INFURA_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
  };
  const provider = ethers.getDefaultProvider('goerli', options);
  const wallet = ethers.Wallet.fromMnemonic(key);
  const signer = wallet.connect(provider);
  return signer;
};

const getContract = (address: string, abi: Array<Object>, signer: any) => {
  return new ethers.Contract(address, abi, signer);
};

export { getSigner, getContract };
