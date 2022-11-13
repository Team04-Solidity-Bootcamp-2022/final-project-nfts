import { useState } from 'react';
import SuccessModal from '../SuccessModal';
import ErrorModal from '../ErrorModal';
import marketABI from '../../data/marketABI.json';
import { chains } from '@web3modal/ethereum';
import { useContractWrite } from '@web3modal/react';
import { ethers } from 'ethers';

const PRICE = ethers.utils.parseEther('0.1');

const BuyButton = ({ tokenId, price }: any) => {
  const config = {
    address: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || '',
    abi: marketABI.abi,
    functionName: 'buyItem',
    chainId: chains.goerli.id,
    args: [
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      tokenId,
      {
        value: PRICE,
      },
    ],
  };
  const { data, error, isLoading, write } = useContractWrite(config);

  return (
    <>
      {!data && (
        <button
          disabled={isLoading}
          onClick={async () => write()}
          className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
        >
          Buy
        </button>
      )}

      {data && (
        <SuccessModal
          title="NFT Purchased"
          text={`You have successfully bought an NFT ${tokenId}!`}
          cta="Done"
        />
      )}

      {error && (
        <ErrorModal
          title="Sorry there was an error"
          text="We cannot process your request at the moment. Please try again later"
          cta="Back"
        />
      )}
    </>
  );
};

export default BuyButton;
