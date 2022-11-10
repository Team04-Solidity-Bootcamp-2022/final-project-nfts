import { chains } from '@web3modal/ethereum';
import { useContractWrite, useWaitForTransaction } from '@web3modal/react';
import nftABI from '../data/nftABI.json';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { generateFromString } from 'generate-avatar';
import SuccessModal from '../components/SuccessModal';

const MakeNFT = ({
  newNft,
  newNftName,
  setNewNft,
  setNewNftName,
  account,
}: any) => {
  const config = {
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '',
    abi: nftABI.abi,
    functionName: 'mint',
    chainId: chains.goerli.id,
  };

  const { data, error, isLoading, write } = useContractWrite(config);
  const { receipt, isWaiting } = useWaitForTransaction({ hash: data?.hash });

  if (data) {
    return (
      <section className="ud-pt-8 ud-pb-14 ud-mt-4">
        <div className="ud-container">
          <SuccessModal></SuccessModal>
        </div>
      </section>
    );
  }

  return (
    <section className="ud-pt-8 ud-pb-14 ud-mt-4">
      <div className="ud-container">
        <h2 className="ud-mb-4 ud-text-[40px] ud-font-bold ud-leading-tight ud-text-white md:ud-text-[50px] lg:ud-text-[40px] xl:ud-text-[46px] 2xl:ud-text-[50px] sm:text-[46px]">
          Create NFT
        </h2>

        <div className="ud-py-8">
          <button
            onClick={() => {
              const art = generateFromString(
                `${account.address}${Math.random()}`
              );
              const artName = uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
                separator: ' ',
                style: 'capital',
                seed: `${account.address}${Math.random()}`,
              });

              setNewNft(art);
              setNewNftName(artName);
            }}
            className="hover:ud-shadow-form ud-w-full ud-rounded-md ud-bg-primary ud-py-3 ud-px-8 ud-text-center ud-text-base ud-font-semibold ud-text-white ud-outline-none"
          >
            Generate NFT
          </button>
        </div>

        {newNft && (
          <div className="ud--mx-4 ud-flex ud-flex-wrap">
            <div className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4">
              <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                  <img
                    src={`data:image/svg+xml;utf8,${newNft}`}
                    alt="auctions"
                    className="ud-w-full"
                  />
                  <button className="ud-absolute ud-right-4 ud-top-4 ud-inline-flex ud-items-center ud-rounded-md ud-bg-white ud-px-2 ud-py-1">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.99999 11.8709L6.15416 11.1009C3.14999 8.37675 1.16666 6.57425 1.16666 4.37508C1.16666 2.57258 2.57832 1.16675 4.37499 1.16675C5.38999 1.16675 6.36416 1.63925 6.99999 2.38008C7.63582 1.63925 8.60999 1.16675 9.62499 1.16675C11.4217 1.16675 12.8333 2.57258 12.8333 4.37508C12.8333 6.57425 10.85 8.37675 7.84582 11.1009L6.99999 11.8709Z"
                        fill="#F85486"
                      />
                    </svg>

                    <span className="ud-pl-1 ud-text-xs ud-font-semibold ud-text-black">
                      4.6K
                    </span>
                  </button>
                </div>
                <div>
                  <h3>
                    <a
                      href="item-details.html"
                      className="ud-mb-3 ud-inline-block ud-text-lg ud-font-semibold ud-text-white hover:ud-text-primary"
                    >
                      {newNftName}
                    </a>
                  </h3>

                  <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                    <button
                      onClick={async () => write()}
                      className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
                      disabled={isLoading}
                    >
                      Mint
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ul>
                <li>
                  Write Data:{' '}
                  <span>{isLoading ? 'Loading...' : JSON.stringify(data)}</span>
                </li>
                <li>
                  Receipt Data:{' '}
                  <span>
                    {isWaiting ? 'Waiting...' : JSON.stringify(receipt)}
                  </span>
                </li>
                <li>
                  Error: <span>{error ? error.message : 'No Error'}</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MakeNFT;
