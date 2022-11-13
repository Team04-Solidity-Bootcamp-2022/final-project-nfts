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

  //contracts
  const marketContract = getContract(
    marketContractAddress,
    marketABI.abi,
    signer
  );
  const nftContract = getContract(nftContractAddress, nftABI.abi, signer);

  //all tokens to owners
  const tokensToOwners: any = [];
  const totalSupply = await nftContract.totalSupply();
  for (var i = 0; i < totalSupply.toNumber(); i++) {
    const owner = await nftContract.ownerOf(i);
    tokensToOwners.push({
      address: owner,
      tokenId: i,
    });
  }

  //tokens at market
  const tokensAtMarket: any = [];
  for (let tokenToOwner of tokensToOwners) {
    const atMarket = await marketContract.getListing(
      process.env.NFT_CONTRACT_ADDRESS || '',
      tokenToOwner.tokenId
    );

    if (atMarket.seller === '0x0000000000000000000000000000000000000000')
      continue;
    tokensAtMarket.push({ ...tokenToOwner, price: atMarket.price });
  }

  const marketData = tokensAtMarket.map((tokenToOwner: any) => {
    return {
      seller: tokenToOwner.address,
      nftAddress: nftContractAddress,
      tokenId: tokenToOwner.tokenId,
      price: ethers.utils.formatEther(tokenToOwner.price),
    };
  });

  res.status(200).json(marketData);
}
