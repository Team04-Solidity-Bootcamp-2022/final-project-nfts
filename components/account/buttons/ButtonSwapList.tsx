import { chains } from '@web3modal/ethereum';
import { useContractWrite, useWaitForTransaction } from '@web3modal/react';
import marketABI from '../../../data/marketABI.json';
import { ethers } from 'ethers';
import SuccessModal from '../../SuccessModal';
import ErrorModal from '../../ErrorModal';

export default function ButtonSwapList({ tokenId }: any) {
  const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';
  const marketContractAddress =
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || '';

  const config = {
    address: marketContractAddress,
    abi: marketABI.abi,
    functionName: 'listSwapItem',
    chainId: chains.goerli.id,
    args: [nftContractAddress, tokenId],
  };

  const { data, error, isLoading, write } = useContractWrite(config);
  const { isWaiting } = useWaitForTransaction({ hash: data?.hash });

  return (
    <>
      {!data && (
        <button
          onClick={async () => write()}
          className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white hover:ud-text-primary sm:ud-px-5"
        >
          <span className="ud-pr-1">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 4.5V6.75L12 3.75L9 0.75V3C7.4087 3 5.88258 3.63214 4.75736 4.75736C3.63214 5.88258 3 7.4087 3 9C3 10.1775 3.345 11.2725 3.93 12.195L5.025 11.1C4.6875 10.4775 4.5 9.75 4.5 9C4.5 7.80653 4.97411 6.66193 5.81802 5.81802C6.66193 4.97411 7.80652 4.5 9 4.5ZM14.07 5.805L12.975 6.9C13.305 7.53 13.5 8.25 13.5 9C13.5 10.1935 13.0259 11.3381 12.182 12.182C11.3381 13.0259 10.1935 13.5 9 13.5V11.25L6 14.25L9 17.25V15C10.5913 15 12.1174 14.3679 13.2426 13.2426C14.3679 12.1174 15 10.5913 15 9C15 7.8225 14.655 6.7275 14.07 5.805Z"
                fill="currentColor"
              />
            </svg>
          </span>
          {!isLoading && !isWaiting && !data && !error && 'Add to Swaps Pool'}
          {isLoading && 'Loading...'}
          {isWaiting && 'Waiting...'}
        </button>
      )}

      {data && (
        <SuccessModal
          title="NFT Listed"
          text={`You have successfully listed NFT ${tokenId}!`}
          cta="Done"
        />
      )}

      {error && (
        <ErrorModal
          title="Sorry there was an error!"
          text="Please try again later"
          cta="Back"
        />
      )}
    </>
  );
}
