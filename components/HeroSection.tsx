const HeroSection = () => {
  return (
    <section
      id="home"
      className="ud-relative ud-z-10 ud-overflow-hidden ud-bg-cover ud-bg-top ud-bg-no-repeat ud-pt-[150px] ud-pb-24"
      style={{
        backgroundImage: `linear-gradient(190deg, #fa7c30 30%, rgba(0, 0, 0, 0)30%), url('./images/hero/common-bg.jpg');`,
      }}
    >
      <div
        className="ud-absolute ud-left-0 ud-top-0 ud--z-10 ud-h-full ud-w-full"
        style={{
          background: `linear-gradient(
          180deg,
          rgba(20, 20, 32, 0.65) 0%,
          #141420 100%
        );`,
        }}
      ></div>
      <div className="ud-container">
        <div className="ud--mx-4 ud-flex ud-flex-wrap ud-items-center">
          <div className="ud-w-full ud-px-4 lg:ud-w-1/2">
            <div className="ud-mb-12 ud-max-w-[570px] lg:ud-mb-0">
              <h1 className="ud-mb-4 ud-text-[40px] ud-font-bold ud-leading-tight ud-text-white md:ud-text-[50px] lg:ud-text-[40px] xl:ud-text-[46px] 2xl:ud-text-[50px] sm:text-[46px]">
                Buy & Swap NFT's to the moon!
              </h1>
              <p className="ud-mb-8 ud-text-lg ud-font-medium ud-leading-relaxed ud-text-body-color md:ud-pr-14">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div className="flex flex-wrap items-center">
                <a className="ud-mr-5 ud-mb-5 ud-inline-flex ud-items-center ud-justify-center ud-rounded-md ud-border-2 ud-border-primary ud-bg-primary ud-py-3 ud-px-7 ud-text-base ud-font-semibold ud-text-white ud-transition-all hover:ud-bg-opacity-90">
                  Swap now!
                </a>
                <a className="ud-mb-5 ud-inline-flex ud-items-center ud-justify-center ud-rounded-md ud-border-2 ud-border-white ud-py-3 ud-px-7 ud-text-base ud-font-semibold ud-text-white ud-transition-all hover:ud-border-primary hover:ud-bg-primary">
                  Buy NFT's
                </a>
              </div>
            </div>
          </div>

          <div className="ud-w-full ud-px-4 lg:ud-w-1/2">
            <div className="ud-text-center">
              <img
                src="images/hero/hero-image.svg"
                alt="hero image"
                className="ud-mx-auto ud-max-w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="ud-absolute ud-left-4 ud-top-28 ud--z-10">
          <svg
            width="111"
            height="115"
            viewBox="0 0 111 115"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_21_53)">
              <g filter="url(#filter1_i_21_53)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M73.287 91.7144C92.1417 80.8286 98.5953 56.729 87.7122 37.8789C76.8291 19.0288 52.7314 12.568 33.8767 23.4537C15.0312 34.3342 8.56843 58.4391 19.4515 77.2892C30.3346 96.1393 54.4415 102.595 73.287 91.7144Z"
                  fill="url(#paint0_linear_21_53)"
                />
              </g>
              <path
                opacity="0.7"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M69.4961 86.3067C86.2379 76.6408 91.9683 55.2418 82.3048 38.5041C72.6412 21.7663 51.244 16.0295 34.5021 25.6954C17.7685 35.3566 12.0299 56.7603 21.6934 73.498C31.357 90.2358 52.7625 95.9679 69.4961 86.3067Z"
                fill="url(#paint1_radial_21_53)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_21_53"
                x="-3.83423"
                y="0.165771"
                width="114.834"
                height="114.834"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="9"
                  result="effect1_foregroundBlur_21_53"
                />
              </filter>
              <filter
                id="filter1_i_21_53"
                x="14.1658"
                y="10.1658"
                width="86.8342"
                height="86.8342"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="8" dy="-8" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.168627 0 0 0 0 0.168627 0 0 0 0 0.321569 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_21_53"
                />
              </filter>
              <linearGradient
                id="paint0_linear_21_53"
                x1="31.6878"
                y1="19.1263"
                x2="63.3007"
                y2="99.1224"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EBC77A" />
                <stop offset="0.541667" stopColor="#CA3F8D" />
                <stop offset="1" stopColor="#5142FC" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_21_53"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(56.6039 36.9093) rotate(63.4349) scale(29.0091)"
              >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </span>
        <div className="ud-absolute ud-left-0 ud-top-0 ud--z-10 ud-flex ud-h-full ud-w-full ud-justify-around ud-opacity-20">
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent ud-hidden lg:ud-flex"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent ud-hidden lg:ud-flex"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent ud-hidden lg:ud-flex"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent ud-hidden md:ud-flex"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent ud-hidden md:ud-flex"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent ud-hidden md:ud-flex"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent"></span>
          <span className="ud-h-full ud-w-[1.1px] ud-bg-gradient-to-b ud-from-white ud-to-transparent"></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
