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
  listed: boolean;
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
  const marketAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS || '';
  const tokenAddress = process.env.NFT_CONTRACT_ADDRESS || '';
  const signer = getSigner(process.env.DEPLOYER_ACCOUNT_MNEMONIC || '');
  const marketContract = new ethers.Contract(
    marketAddress,
    marketABI.abi,
    signer
  );

  const tokenContract = new ethers.Contract(tokenAddress, nftABI.abi, signer);

  const filter = tokenContract.filters.Transfer(null, givenAddress);
  let transferEvents = await tokenContract.queryFilter(filter);

  const ids: any[] = [];
  transferEvents.map((evt: any) => {
    const tokenId = evt.args.tokenId.toNumber().toString();
    ids.push(tokenId);
  });

  const nfts: any = ids.map((id) => {
    const image = generateFromString(`${id}${Math.random()}`);
    const name = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: ' ',
      style: 'capital',
      seed: `${id}${Math.random()}`,
    });

    return {
      nftAddress: process.env.NFT_CONTRACT_ADDRESS || '',
      seller: givenAddress,
      tokenId: id,
      price: '0',
      image: image,
      name: name,
      listed: false,
    };
  });

  res.status(200).json(nfts);
}
