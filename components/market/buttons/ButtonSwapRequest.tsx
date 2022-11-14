import { useContractWrite, useWaitForTransaction } from '@web3modal/react';
import marketABI from '../../../data/marketABI.json';
import { chains } from '@web3modal/ethereum';
import SuccessModal from '../../SuccessModal';
import ErrorModal from '../../ErrorModal';

const ButtonSwapRequest = ({ tokenForSwap, pageToken }: any) => {
  const marketContractAddress =
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || '';
  const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';

  const config = {
    address: marketContractAddress,
    abi: marketABI.abi,
    functionName: 'makeSwapOffer',
    chainId: chains.goerli.id,
    args: [
      nftContractAddress,
      parseInt(pageToken),
      nftContractAddress,
      parseInt(tokenForSwap),
    ],
  };

  const { data, error, isLoading, write } = useContractWrite(config);
  const { isWaiting } = useWaitForTransaction({ hash: data?.hash });

  return (
    <>
      {!data && tokenForSwap !== '-1' && (
        <button
          disabled={isLoading}
          onClick={async () => write()}
          className="ud-w-full ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-p-[14px] ud-px-[45px] ud-text-base ud-font-semibold ud-text-white hover:ud-bg-opacity-90"
        >
          {!isLoading && !isWaiting && !data && 'Swap'}
          {isLoading && 'Loading...'}
          {isWaiting && 'Waiting...'}{' '}
          {!isLoading && !isWaiting && !data && (
            <>
              {tokenForSwap} for {pageToken}
            </>
          )}
        </button>
      )}

      {data && (
        <SuccessModal
          title="Success!"
          text={`You have successfully requested a swap`}
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
};

export default ButtonSwapRequest;
