import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Link from 'next/link';
import { generateName, generateUserName } from '../../utils/generateName';
import generateSvg from '../../utils/generateSvg';
import ButtonBuyLarge from '../../components/market/buttons/ButtonBuyLarge';
import SwapRequest from '../../components/market/SwapRequest';
import SwapApprove from '../../components/market/SwapApprove';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import ErrorAlert from '../../components/ErrorAlert';
import { useAccount } from '@web3modal/react';

const fetchNFT = async (tokenId: any) => {
  const response = await fetch(`/api/nft?tokenId=${tokenId}`);
  return response.json();
};

const NFT = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const { data, status } = useQuery(['fetchNFT', tokenId], () =>
    fetchNFT(tokenId)
  );

  const { account } = useAccount();

  return (
    <>
      <Header />

      <section className="ud-pt-[150px] ud-pb-24">
        <div className="ud-container">
          <div className="ud-rounded-lg ud-border-2 ud-border-stroke ud-bg-bg-color ud-py-5 ud-px-8">
            <ul className="ud-flex ud-items-center">
              <li className="ud-flex ud-items-center ud-text-base ud-font-medium ud-text-white">
                <Link legacyBehavior href="/">
                  <a className="ud-text-white hover:ud-text-primary">Home</a>
                </Link>
                <span className="ud-px-3"> / </span>
              </li>
              <li className="ud-flex ud-items-center ud-text-base ud-font-medium ud-text-white">
                <Link legacyBehavior href="/marketplace">
                  Marketplace
                </Link>
                <span className="ud-px-3"> / </span>
              </li>
              <li className="ud-flex ud-items-center ud-text-base ud-font-medium ud-text-white">
                NFT {tokenId}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {status === 'loading' && (
        <div className="ud-content-center">
          <ThreeCircles
            height="200"
            width="200"
            color="#5142FC"
            wrapperStyle={{}}
            wrapperClass="ud-justify-center"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      )}

      {status === 'success' && (
        <section className="ud-pt-8 ud-pb-24">
          <div className="ud-container">
            <div className="ud--mx-4 ud-flex ud-flex-wrap">
              <div className="ud-w-full ud-px-4 lg:ud-w-1/2">
                <div className="ud-mb-12 ud-flex ud-w-full ud-items-center ud-justify-center ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-py-8 sm:ud-py-14 md:ud-py-24 lg:ud-mb-0 lg:ud-py-16 xl:ud-py-28">
                  <img
                    src={`data:image/svg+xml;utf8,${generateSvg(data.tokenId)}`}
                    alt="details image"
                  />
                </div>
              </div>

              <div className="ud-w-full ud-px-4 lg:ud-w-1/2">
                <div className="xl:ud-pl-8">
                  <div className="ud-mb-9 ud-justify-between sm:ud-flex">
                    <h2 className="ud-mb-3 ud-text-3xl ud-font-bold ud-text-white sm:ud-mb-0 sm:ud-text-[38px] lg:ud-text-3xl xl:ud-text-[38px]">
                      {generateName(data.tokenId)}
                    </h2>
                    <button className="ud-inline-flex ud-items-center ud-rounded-md ud-bg-white ud-px-2 ud-py-1">
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

                  <div className="ud-mb-9 sm:ud-flex">
                    <div className="ud-flex ud-items-center ud-border-body-color ud-pr-0 ud-pb-3 sm:ud-pr-8 sm:ud-pb-0">
                      <div className="ud-mr-2 ud-h-11 ud-w-full ud-max-w-[44px] ud-rounded-md">
                        <img
                          src={`data:image/svg+xml;utf8,${generateSvg(
                            data.seller
                          )}`}
                          alt="creator"
                          className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                        />
                      </div>
                      <div className="ud-w-full">
                        <h3 className="ud-text-base ud-font-semibold ud-text-white">
                          @{generateUserName(data.seller)}
                          <span className="ud-block ud-text-base ud-font-medium ud-text-body-color">
                            Owned by
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="ud-mb-9 ud-text-base ud-font-medium ud-leading-relaxed ud-text-body-color">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    sodales mi felis, pretium tincidunt lorem varius ac.
                    Curabitur mauris lacus, pretium vel neque nec, blandit
                    pharetra nulla.
                  </p>

                  {account.address !== data.seller && (
                    <div className="ud-mb-14">
                      <ButtonBuyLarge tokenId={tokenId} />
                    </div>
                  )}

                  <SwapRequest account={account} pageToken={data.tokenId} />

                  <SwapApprove />

                  {account.address === data.seller && (
                    <div className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-dark ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5">
                      OWNED
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {status === 'error' && (
        <section className="ud-pt-8 ud-pb-24">
          <div className="ud-container">
            <div className=" ud-w-full ud-flex ud-flex-wrap">
              <ErrorAlert msg="Try refreshing the page to load NFT" />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default NFT;
