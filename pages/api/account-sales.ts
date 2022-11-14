// FOR TESTING PURPOSES ONLY. DO NOT USE IN PROD!
import type { NextApiRequest, NextApiResponse } from 'next';
import marketABI from '../../data/marketABI.json';
import nftABI from '../../data/nftABI.json';
import { getSigner, getContract } from '../../utils/contract';
import { ethers } from 'ethers';

type Data = {
  nftAddress: any;
  seller: any;
  tokenId: any;
  price: any;
  listed: any;
};

type DataArr = Data[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  const address = req.query.address;
  const marketContractAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS || '';
  const signer = getSigner(process.env.DEPLOYER_ACCOUNT_MNEMONIC || '');

  const marketContract = getContract(
    marketContractAddress,
    marketABI.abi,
    signer
  );

  const proceeds = await marketContract.getProceeds(address);
  const cleanProceeds = ethers.utils.formatEther(proceeds);

  res.status(200).json({
    proceeds: cleanProceeds,
    raw: proceeds,
  });
}
