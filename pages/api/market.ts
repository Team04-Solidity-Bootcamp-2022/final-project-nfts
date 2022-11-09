// FOR TESTING PURPOSES ONLY. DO NOT USE IN PRODUCTION!
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import marketABI from '../../data/marketABI.json';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { generateFromString } from 'generate-avatar';

type Data = {
  seller: string;
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
  const address = process.env.MARKET_ADDRESS || '';
  const signer = getSigner(process.env.MARKET_OWNER || '');
  const marketContract = new ethers.Contract(address, marketABI.abi, signer);
  const listFilter = marketContract.filters.ItemListed();
  const events = await marketContract.queryFilter(listFilter);
  const cleanEvents = events.map((evt: any) => {
    const image = generateFromString(`${evt.args.tokenId}${Math.random()}`);
    const name = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: ' ',
      style: 'capital',
      seed: `${evt.args.tokenId}${Math.random()}`,
    });

    return {
      seller: evt.args.seller,
      nftAddress: evt.args.nftAddress,
      tokenId: evt.args.tokenId.toString(),
      price: ethers.utils.formatEther(evt.args.price),
      image: image,
      name: name,
    };
  });

  res.status(200).json(cleanEvents);
}
