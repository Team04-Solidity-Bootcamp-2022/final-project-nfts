// FOR TESTING PURPOSES ONLY. DO NOT USE IN PRODUCTION!
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import marketABI from '../../data/marketABI.json';
import { getSigner, getContract } from '../../utils/contract';
import nftABI from '../../data/nftABI.json';

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
  const signer = getSigner(process.env.DEPLOYER_ACCOUNT_MNEMONIC || '');
  const marketContractAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS || '';
  const nftContractAddress = process.env.NFT_CONTRACT_ADDRESS || '';
  const pageToken: any = req.query.pageToken;

  //contracts
  const marketContract = getContract(
    marketContractAddress,
    marketABI.abi,
    signer
  );

  const offers = await marketContract.getSwapOffersForNft(
    nftContractAddress,
    parseInt(pageToken)
  );

  const cleanOffers = offers.map((offer: any) => {
    return {
      ...offer,
      swapTokenId: offer.swapTokenId.toNumber(),
    };
  });

  res.status(200).json(cleanOffers);
}
