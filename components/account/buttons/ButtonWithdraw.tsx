//withdrawProceeds

import { useContractWrite, useWaitForTransaction } from '@web3modal/react';
import marketABI from '../../../data/marketABI.json';
import { chains } from '@web3modal/ethereum';
import SuccessModal from '../../SuccessModal';
import ErrorModal from '../../ErrorModal';

const ButtonWithdraw = ({ refetch }: any) => {
  const marketContractAddress =
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || '';

  const config = {
    address: marketContractAddress,
    abi: marketABI.abi,
    functionName: 'withdrawProceeds',
    chainId: chains.goerli.id,
  };

  const { data, error, isLoading, write } = useContractWrite(config);
  const { isWaiting } = useWaitForTransaction({ hash: data?.hash });

  if (data) {
    refetch();
  }

  return (
    <>
      {!data && (
        <div className="pt-2">
          <button
            onClick={async () => write()}
            className="hover:ud-shadow-form ud-w-full ud-rounded-md ud-bg-secondary ud-py-3 ud-px-8 ud-text-center ud-text-base ud-font-semibold ud-text-white ud-outline-none"
          >
            {!isLoading && !isWaiting && !data && 'Withdraw'}
            {isLoading && 'Loading...'}
            {isWaiting && 'Waiting...'}
          </button>
        </div>
      )}

      {data && (
        <SuccessModal
          title="Success!"
          text={`You have successfully withdrawn proceeds`}
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

export default ButtonWithdraw;
