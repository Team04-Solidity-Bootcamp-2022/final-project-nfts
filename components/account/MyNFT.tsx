import { useQuery } from 'react-query';

const fetchEvents = async (address: any) => {
  console.log(address);
  const response = await fetch(`/api/mynft?address=${address}`);
  return response.json();
};

const MyNFT = ({ account }: any) => {
  const { data, status } = useQuery(['myNFT', account.address], () =>
    fetchEvents(account.address)
  );

  return (
    <>
      <section className="ud-pb-14">
        <div className="ud-container">
          <h1 className="ud-mb-4 ud-text-[40px] ud-font-bold ud-leading-tight ud-text-white md:ud-text-[50px] lg:ud-text-[40px] xl:ud-text-[46px] 2xl:ud-text-[50px] sm:text-[46px]">
            My NFT's
          </h1>

          {status === 'success' && (
            <div className="ud--mx-4 ud-flex ud-flex-wrap">
              {data.map((nft: any) => (
                <div
                  key={nft.tokenId}
                  className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4"
                >
                  <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                    <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                      <img
                        src={`data:image/svg+xml;utf8,${nft.image}`}
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
                          {nft.name}
                        </a>
                      </h3>
                      <div className="ud-mb-6 ud-flex ud-items-center ud-justify-between">
                        <div className="ud-w-full">
                          <div className="ud-flex ud-items-center">
                            <div className="ud-mr-2 ud-h-8 ud-w-full ud-max-w-[32px] ud-rounded-md">
                              <img
                                src="images/picks/creator-01.png"
                                alt="creator"
                                className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                              />
                            </div>
                            <div className="ud-w-full">
                              <h4 className="ud-text-xs ud-font-semibold ud-text-white">
                                @Devid_Mill...
                                <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                                  creator
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="ud-w-full">
                          <h5 className="ud-text-right ud-text-xs ud-font-semibold ud-text-white">
                            {nft.price} ETH
                            <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                              Current Bit
                            </span>
                          </h5>
                        </div>
                      </div>

                      <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                        <a className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5">
                          Buy
                        </a>
                        <a className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white hover:ud-text-primary sm:ud-px-5">
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
                          Swap
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyNFT;
