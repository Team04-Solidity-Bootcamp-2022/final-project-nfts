// FOR TESTING PURPOSES ONLY. DO NOT USE IN PRODUCTION!
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import marketABI from '../../data/marketABI.json';
import { getSigner, getContract } from '../../utils/contract';

type Data = {
  nftAddress: any;
  seller: any;
  tokenId: any;
  price: any;
};

type DataArr = Data[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataArr>
) {
  const marketContractAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS || '';
  const signer = getSigner(process.env.DEPLOYER_ACCOUNT_MNEMONIC || '');

  const marketContract = getContract(
    marketContractAddress,
    marketABI.abi,
    signer
  );

  const listFilter = marketContract.filters.ItemListed();
  const events = await marketContract.queryFilter(listFilter);
  const cleanEvents = events.map((evt: any) => {
    return {
      seller: evt.args.seller,
      nftAddress: evt.args.nftAddress,
      tokenId: evt.args.tokenId.toString(),
      price: ethers.utils.formatEther(evt.args.price),
    };
  });

  res.status(200).json(cleanEvents);
}
