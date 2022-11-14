import { chains } from '@web3modal/ethereum';
import { useContractWrite, useWaitForTransaction } from '@web3modal/react';
import nftABI from '../../../data/nftABI.json';
import SuccessModal from '../../SuccessModal';
import ErrorModal from '../../ErrorModal';

export default function ButtonApprove({ tokenId }: any) {
  const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';
  const marketContractAddress =
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || '';

  const config = {
    address: nftContractAddress,
    abi: nftABI.abi,
    functionName: 'approve',
    chainId: chains.goerli.id,
    args: [marketContractAddress, tokenId],
  };

  const { data, error, isLoading, write } = useContractWrite(config);
  const { isWaiting } = useWaitForTransaction({ hash: data?.hash });

  return (
    <>
      {!data && (
        <button
          onClick={async () => write()}
          className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
        >
          {!isLoading && !isWaiting && !data && 'Approve'}
          {isLoading && 'Loading...'}
          {isWaiting && 'Waiting...'}
        </button>
      )}

      {data && (
        <SuccessModal
          title="NFT Approved"
          text={`You have successfully approved an NFT ${tokenId}! Make sure to add to market.`}
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
