// FOR TESTING PURPOSES ONLY. DO NOT USE IN PRODUCTION!
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import marketABI from '../../data/marketABI.json';
import nftABI from '../../data/nftABI.json';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { generateFromString } from 'generate-avatar';

type Data = {
  seller: string | undefined;
  nftAddress: string;
  tokenId: string;
  price: string;
  image: string;
  name: string;
};

type DataArr = Data[];

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataArr>
) {
  const givenAddress = req.query.address;
  const marketAddress = process.env.MARKET_ADDRESS || '';
  const tokenAddress = process.env.TOKEN_ADDRESS || '';
  const signer = getSigner(process.env.MARKET_OWNER || '');
  const marketContract = new ethers.Contract(
    marketAddress,
    marketABI.abi,
    signer
  );

  const tokenContract = new ethers.Contract(tokenAddress, nftABI.abi, signer);
  const balance = await tokenContract.balanceOf(givenAddress);

  const tokens: DataArr = [];
  for (let i = 0; i < balance.toNumber(); i++) {
    const id = await tokenContract.tokenOfOwnerByIndex(givenAddress, i);

    const image = generateFromString(`${id.toNumber()}${Math.random()}`);
    const name = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: ' ',
      style: 'capital',
      seed: `${id.toNumber()}${Math.random()}`,
    });

    tokens.push({
      seller: givenAddress?.toString(),
      nftAddress: tokenAddress.toString(),
      tokenId: id.toNumber().toString(),
      image: image,
      name: name,
      price: '',
    });
  }

  res.status(200).json(tokens);
}
