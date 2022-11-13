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
  res: NextApiResponse<DataArr>
) {
  const address = req.query.address;
  const marketContractAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS || '';
  const nftContractAddress = process.env.NFT_CONTRACT_ADDRESS || '';
  const signer = getSigner(process.env.DEPLOYER_ACCOUNT_MNEMONIC || '');

  const marketContract = getContract(
    marketContractAddress,
    marketABI.abi,
    signer
  );

  const nftContract = getContract(nftContractAddress, nftABI.abi, signer);

  const balance = await nftContract.balanceOf(address);
  const cleanBalance = balance.toNumber();

  const tokens = [];
  for (var i = 0; i < cleanBalance; i++) {
    const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
    tokens.push(tokenId.toNumber());
  }

  const userTokens: any = [];
  for (let tokenId of tokens) {
    const listing = await marketContract.getListing(
      nftContractAddress,
      tokenId
    );
    const isListed =
      listing.seller !== '0x0000000000000000000000000000000000000000';

    userTokens.push({
      nftAddress: nftContractAddress,
      seller: address,
      tokenId: tokenId,
      price: ethers.utils.formatEther(listing.price),
      listed: isListed,
    });
  }

  res.status(200).json(userTokens);
}
