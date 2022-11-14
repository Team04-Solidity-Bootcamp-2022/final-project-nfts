import SuccessModal from '../../SuccessModal';
import ErrorModal from '../../ErrorModal';
import marketABI from '../../../data/marketABI.json';
import { chains } from '@web3modal/ethereum';
import { useContractWrite } from '@web3modal/react';
import { ethers } from 'ethers';

const PRICE = ethers.utils.parseEther('0.05');

const ButtonBuyLarge = ({ tokenId }: any) => {
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
          className="ud-w-full ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-p-[14px] ud-text-base ud-font-semibold ud-text-white hover:ud-bg-opacity-90"
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

export default ButtonBuyLarge;
