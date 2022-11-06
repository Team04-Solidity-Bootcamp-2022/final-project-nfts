import Header from '../components/Header';

export default function Marketplace() {
  return (
    <>
      <Header />
      <section className="ud-pt-8 ud-pb-24 ud-mt-24">
        <div className="ud-container">
          <div className="ud-mb-14 ud-rounded-lg ud-border-2 ud-border-stroke ud-py-4 ud-px-5">
            <div className="ud--mx-4 ud-flex ud-flex-wrap ud-items-center ud-justify-between">
              <div className="ud-w-full ud-px-4 lg:ud-w-7/12">
                <div className="ud-flex ud-space-x-3 ud-overflow-x-auto ud-pb-8 lg:ud-pb-0">
                  <button className="ud-inline-flex ud-items-center ud-justify-center ud-whitespace-nowrap ud-rounded-md ud-bg-[#353444] ud-py-[10px] ud-px-5 ud-text-base ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-primary">
                    All
                  </button>
                  <button className="ud-inline-flex ud-items-center ud-justify-center ud-whitespace-nowrap ud-rounded-md ud-bg-[#353444] ud-py-[10px] ud-px-5 ud-text-base ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-primary">
                    Digital Art
                  </button>
                  <button className="ud-inline-flex ud-items-center ud-justify-center ud-whitespace-nowrap ud-rounded-md ud-bg-[#353444] ud-py-[10px] ud-px-5 ud-text-base ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-primary">
                    Music
                  </button>
                  <button className="ud-inline-flex ud-items-center ud-justify-center ud-whitespace-nowrap ud-rounded-md ud-bg-[#353444] ud-py-[10px] ud-px-5 ud-text-base ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-primary">
                    3D Illustration
                  </button>
                </div>
              </div>
              <div className="ud-w-full ud-px-4 lg:ud-w-5/12">
                <div className="ud-flex ud-space-x-3 lg:ud-justify-end">
                  <div className="ud-relative ud-inline-flex">
                    <select className="ud-appearance-none ud-rounded-md ud-bg-[#353444] ud-py-3 ud-pl-5 ud-pr-10 ud-text-base ud-font-semibold ud-text-white ud-outline-none">
                      <option value="">All Artworks</option>
                      <option value="">Digital</option>
                      <option value="">Illustration</option>
                    </select>
                    <span className="ud-absolute ud-right-5 ud-top-1/2 ud--translate-y-1/2">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.41 0.580078L6 5.17008L10.59 0.580078L12 2.00008L6 8.00008L0 2.00008L1.41 0.580078Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="ud-relative ud-inline-flex">
                    <select className="ud-appearance-none ud-rounded-md ud-bg-[#353444] ud-py-3 ud-pl-5 ud-pr-10 ud-text-base ud-font-semibold ud-text-white ud-outline-none">
                      <option value="" selected>
                        Sort By
                      </option>
                      <option value="">Top rate</option>
                      <option value="">Mid rate</option>
                      <option value="">Low rate</option>
                    </select>
                    <span className="ud-absolute ud-right-5 ud-top-1/2 ud--translate-y-1/2">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.41 0.580078L6 5.17008L10.59 0.580078L12 2.00008L6 8.00008L0 2.00008L1.41 0.580078Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ud--mx-4 ud-flex ud-flex-wrap">
            <div className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4">
              <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                  <img
                    src="images/picks/image-01.svg"
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
                      3d abstract illustration
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
                        5.49 ETH
                        <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                          Current Bit
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                    <a
                      href="javascript:void(0)"
                      className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
                    >
                      Buy
                    </a>
                    <a
                      href="javascript:void(0)"
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
                      Swap
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4">
              <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                  <img
                    src="images/picks/image-02.svg"
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
                      1.6K
                    </span>
                  </button>
                </div>
                <div>
                  <h3>
                    <a
                      href="item-details.html"
                      className="ud-mb-3 ud-inline-block ud-text-lg ud-font-semibold ud-text-white hover:ud-text-primary"
                    >
                      3d abstract illustration
                    </a>
                  </h3>
                  <div className="ud-mb-6 ud-flex ud-items-center ud-justify-between">
                    <div className="ud-w-full">
                      <div className="ud-flex ud-items-center">
                        <div className="ud-mr-2 ud-h-8 ud-w-full ud-max-w-[32px] ud-rounded-md">
                          <img
                            src="images/picks/creator-02.png"
                            alt="creator"
                            className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                          />
                        </div>
                        <div className="ud-w-full">
                          <h4 className="ud-text-xs ud-font-semibold ud-text-white">
                            @Wilium_de...
                            <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                              creator
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="ud-w-full">
                      <h5 className="ud-text-right ud-text-xs ud-font-semibold ud-text-white">
                        2.85 ETH
                        <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                          Current Bit
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                    <a
                      href="javascript:void(0)"
                      className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
                    >
                      Buy
                    </a>
                    <a
                      href="javascript:void(0)"
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
                      Swap
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4">
              <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                  <img
                    src="images/picks/image-03.svg"
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
                      3d abstract illustration
                    </a>
                  </h3>
                  <div className="ud-mb-6 ud-flex ud-items-center ud-justify-between">
                    <div className="ud-w-full">
                      <div className="ud-flex ud-items-center">
                        <div className="ud-mr-2 ud-h-8 ud-w-full ud-max-w-[32px] ud-rounded-md">
                          <img
                            src="images/picks/creator-03.png"
                            alt="creator"
                            className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                          />
                        </div>
                        <div className="ud-w-full">
                          <h4 className="ud-text-xs ud-font-semibold ud-text-white">
                            @Nicolo_Tes...
                            <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                              creator
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="ud-w-full">
                      <h5 className="ud-text-right ud-text-xs ud-font-semibold ud-text-white">
                        7.82 ETH
                        <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                          Current Bit
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                    <a
                      href="javascript:void(0)"
                      className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
                    >
                      Buy
                    </a>
                    <a
                      href="javascript:void(0)"
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
                      Swap
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4">
              <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                  <img
                    src="images/picks/image-04.svg"
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
                      3d abstract illustration
                    </a>
                  </h3>
                  <div className="ud-mb-6 ud-flex ud-items-center ud-justify-between">
                    <div className="ud-w-full">
                      <div className="ud-flex ud-items-center">
                        <div className="ud-mr-2 ud-h-8 ud-w-full ud-max-w-[32px] ud-rounded-md">
                          <img
                            src="images/picks/creator-04.png"
                            alt="creator"
                            className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                          />
                        </div>
                        <div className="ud-w-full">
                          <h4 className="ud-text-xs ud-font-semibold ud-text-white">
                            @Liza_Auro...
                            <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                              creator
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="ud-w-full">
                      <h5 className="ud-text-right ud-text-xs ud-font-semibold ud-text-white">
                        0.25 ETH
                        <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                          Current Bit
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                    <a
                      href="javascript:void(0)"
                      className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
                    >
                      Buy
                    </a>
                    <a
                      href="javascript:void(0)"
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
                      Swap
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4">
              <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                  <img
                    src="images/picks/image-05.svg"
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
                      3d abstract illustration
                    </a>
                  </h3>
                  <div className="ud-mb-6 ud-flex ud-items-center ud-justify-between">
                    <div className="ud-w-full">
                      <div className="ud-flex ud-items-center">
                        <div className="ud-mr-2 ud-h-8 ud-w-full ud-max-w-[32px] ud-rounded-md">
                          <img
                            src="images/picks/creator-05.png"
                            alt="creator"
                            className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                          />
                        </div>
                        <div className="ud-w-full">
                          <h4 className="ud-text-xs ud-font-semibold ud-text-white">
                            @Lathium_Lui...
                            <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                              creator
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="ud-w-full">
                      <h5 className="ud-text-right ud-text-xs ud-font-semibold ud-text-white">
                        3.24 ETH
                        <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                          Current Bit
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                    <a
                      href="javascript:void(0)"
                      className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
                    >
                      Buy
                    </a>
                    <a
                      href="javascript:void(0)"
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
                      Swap
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4">
              <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                  <img
                    src="images/picks/image-06.svg"
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
                      3d abstract illustration
                    </a>
                  </h3>
                  <div className="ud-mb-6 ud-flex ud-items-center ud-justify-between">
                    <div className="ud-w-full">
                      <div className="ud-flex ud-items-center">
                        <div className="ud-mr-2 ud-h-8 ud-w-full ud-max-w-[32px] ud-rounded-md">
                          <img
                            src="images/picks/creator-06.png"
                            alt="creator"
                            className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                          />
                        </div>
                        <div className="ud-w-full">
                          <h4 className="ud-text-xs ud-font-semibold ud-text-white">
                            @Marko...
                            <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                              creator
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="ud-w-full">
                      <h5 className="ud-text-right ud-text-xs ud-font-semibold ud-text-white">
                        4.55 ETH
                        <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                          Current Bit
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                    <a
                      href="javascript:void(0)"
                      className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
                    >
                      Buy
                    </a>
                    <a
                      href="javascript:void(0)"
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
                      Swap
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4">
              <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                  <img
                    src="images/picks/image-07.svg"
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
                      3d abstract illustration
                    </a>
                  </h3>
                  <div className="ud-mb-6 ud-flex ud-items-center ud-justify-between">
                    <div className="ud-w-full">
                      <div className="ud-flex ud-items-center">
                        <div className="ud-mr-2 ud-h-8 ud-w-full ud-max-w-[32px] ud-rounded-md">
                          <img
                            src="images/picks/creator-07.png"
                            alt="creator"
                            className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                          />
                        </div>
                        <div className="ud-w-full">
                          <h4 className="ud-text-xs ud-font-semibold ud-text-white">
                            @Andrio_Hev...
                            <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                              creator
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="ud-w-full">
                      <h5 className="ud-text-right ud-text-xs ud-font-semibold ud-text-white">
                        0.89 ETH
                        <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                          Current Bit
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                    <a
                      href="javascript:void(0)"
                      className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
                    >
                      Buy
                    </a>
                    <a
                      href="javascript:void(0)"
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
                      Swap
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ud-w-full ud-px-4 md:ud-w-1/2 lg:ud-w-1/3 2xl:ud-w-1/4">
              <div className="ud-mb-10 ud-rounded-xl ud-border ud-border-stroke ud-bg-bg-color ud-p-[18px]">
                <div className="ud-relative ud-mb-5 ud-overflow-hidden ud-rounded-lg">
                  <img
                    src="images/picks/image-08.svg"
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
                      3d abstract illustration
                    </a>
                  </h3>
                  <div className="ud-mb-6 ud-flex ud-items-center ud-justify-between">
                    <div className="ud-w-full">
                      <div className="ud-flex ud-items-center">
                        <div className="ud-mr-2 ud-h-8 ud-w-full ud-max-w-[32px] ud-rounded-md">
                          <img
                            src="images/picks/creator-08.png"
                            alt="creator"
                            className="ud-h-full ud-w-full ud-object-cover ud-object-center"
                          />
                        </div>
                        <div className="ud-w-full">
                          <h4 className="ud-text-xs ud-font-semibold ud-text-white">
                            @Mariya_Hie...
                            <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                              creator
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="ud-w-full">
                      <h5 className="ud-text-right ud-text-xs ud-font-semibold ud-text-white">
                        1.75 ETH
                        <span className="ud-block ud-text-xs ud-font-medium ud-text-body-color">
                          Current Bit
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="ud-flex ud-items-center ud-justify-between ud-border-t-2 ud-border-stroke ud-pt-5">
                    <a
                      href="javascript:void(0)"
                      className="ud-flex ud-items-center ud-justify-center ud-rounded-md ud-bg-primary ud-py-3 ud-px-4 ud-text-sm ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90 sm:ud-px-5"
                    >
                      Buy
                    </a>
                    <a
                      href="javascript:void(0)"
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
                      Swap
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
