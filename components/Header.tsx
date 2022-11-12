import { useAccount, Web3Button } from '@web3modal/react';
import Link from 'next/link';

const Header = () => {
  const { account } = useAccount();
  return (
    <header className="header ud-top-0 ud-left-0 ud-flex ud-w-full ud-items-center ud-backdrop-blur-sm ud-transition ud-fixed ud-z-50">
      <div className="ud-container">
        <div className="ud-relative ud-mx-[-16px] ud-flex ud-items-center ud-justify-between">
          <div className="ud-w-60 ud-max-w-full ud-px-4">
            <Link legacyBehavior href="/">
              <a className="header-logo ud-block ud-w-full ud-py-5 lg:ud-py-7">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="ud-h-10 ud-max-w-full"
                />
              </a>
            </Link>
          </div>
          <div className="ud-flex ud-w-full ud-items-center ud-justify-between ud-px-4">
            <div>
              <button
                id="navbarToggler"
                name="navbarToggler"
                aria-label="navbarToggler"
                className="ud-absolute ud-right-4 ud-top-1/2 ud-block ud-translate-y-[-50%] ud-rounded-lg ud-px-3 ud-py-[6px] ud-ring-primary focus:ud-ring-2 lg:ud-hidden"
              >
                <span className="ud-relative ud-my-[6px] ud-block ud-h-[2px] ud-w-[30px] ud-bg-white"></span>
                <span className="ud-relative ud-my-[6px] ud-block ud-h-[2px] ud-w-[30px] ud-bg-white"></span>
                <span className="ud-relative ud-my-[6px] ud-block ud-h-[2px] ud-w-[30px] ud-bg-white"></span>
              </button>
              <nav
                id="navbarCollapse"
                className="ud-absolute ud-right-4 ud-top-full ud-w-full ud-max-w-[250px] ud-rounded-lg ud-bg-bg-color ud-shadow-lg lg:ud-static lg:ud-block lg:ud-w-full lg:ud-max-w-full lg:ud-bg-transparent ud-py-3 lg:ud-py-0 lg:ud-px-4 lg:ud-shadow-none xl:ud-px-6 ud-hidden"
              >
                <ul className="ud-blcok lg:ud-flex">
                  <li className="ud-group ud-relative">
                    <Link
                      className="ud-mx-8 ud-flex ud-py-2 ud-text-base ud-font-semibold ud-text-white group-hover:ud-text-white lg:ud-mr-0 lg:ud-inline-flex lg:ud-py-6 lg:ud-px-0"
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="ud-group ud-relative">
                    <Link
                      className="ud-mx-8 ud-flex ud-py-2 ud-text-base ud-font-semibold ud-text-white group-hover:ud-text-white lg:ud-mr-0 lg:ud-inline-flex lg:ud-py-6 lg:ud-px-0"
                      href="/marketplace"
                    >
                      Marketplace
                    </Link>
                  </li>
                  {account.isConnected && (
                    <>
                      <li className="ud-group ud-relative">
                        <Link
                          className="ud-mx-8 ud-flex ud-py-2 ud-text-base ud-font-semibold ud-text-white group-hover:ud-text-white lg:ud-mr-0 lg:ud-inline-flex lg:ud-py-6 lg:ud-px-0"
                          href="/account"
                        >
                          Account
                        </Link>
                      </li>
                      <li className="ud-group ud-relative">
                        <Link
                          className="ud-mx-8 ud-flex ud-py-2 ud-text-base ud-font-semibold ud-text-white group-hover:ud-text-white lg:ud-mr-0 lg:ud-inline-flex lg:ud-py-6 lg:ud-px-0"
                          href="/account/create-nft"
                        >
                          Create NFT
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
            <div className="ud-hidden ud-justify-end ud-pr-16 sm:ud-flex lg:ud-pr-0">
              <Web3Button />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
