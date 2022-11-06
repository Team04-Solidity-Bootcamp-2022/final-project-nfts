import Header from '../../components/Header';
import Link from 'next/link';
import { useAccount, useBalance, Web3Button } from '@web3modal/react';

export default function Home() {
  const { account } = useAccount();
  const { data, isLoading, refetch } = useBalance({
    addressOrName: account.address,
  });

  if (!account.isConnected) {
    return (
      <>
        <Header />

        <section className="ud-pt-[150px] ud-pb-24">
          <div className="ud-container">
            <div className="ud-rounded-lg ud-border-2 ud-border-stroke ud-bg-bg-color ud-py-5 ud-px-8">
              Connect your wallet!
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="ud-pt-[150px] ud-pb-24">
        <div className="ud-container">
          <div className="ud-rounded-lg ud-border-2 ud-border-stroke ud-bg-bg-color ud-py-5 ud-px-8">
            <ul className="ud-flex ud-items-center">
              <li className="ud-flex ud-items-center ud-text-base ud-font-medium ud-text-white">
                <Link className="ud-text-white hover:ud-text-primary" href="/">
                  Home
                </Link>
                <span className="ud-px-3"> / </span>
              </li>
              <li className="ud-flex ud-items-center ud-text-base ud-font-medium ud-text-white">
                <Link href="/account">Account</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ud-pb-24">
        <div className="ud-container">
          <h1 className="ud-mb-4 ud-text-[40px] ud-font-bold ud-leading-tight ud-text-white md:ud-text-[50px] lg:ud-text-[40px] xl:ud-text-[46px] 2xl:ud-text-[50px] sm:text-[46px]">
            My Account
          </h1>
          <div className="ud-relative ud-z-10 ud-overflow-hidden ud-rounded-xl ud-bg-bg-color">
            <form className="ud-p-8 sm:ud-p-10">
              <div className="ud--mx-5 ud-flex ud-flex-wrap xl:ud--mx-8">
                <div className="ud-w-full ud-px-5 lg:ud-w-7/12 xl:ud-px-8">
                  <div>
                    <div className="ud-mb-5">
                      <label className="ud-mb-2 ud-block ud-text-base ud-font-medium ud-text-white">
                        Address
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={account.address}
                        className="ud-w-full ud-rounded-md ud-border ud-border-stroke ud-bg-[#353444] ud-py-3 ud-px-6 ud-text-base ud-font-medium ud-text-body-color ud-outline-none ud-transition-all focus:ud-bg-[#454457] focus:ud-shadow-input"
                        readOnly
                      />
                    </div>
                    <div className="ud-mb-5">
                      <label className="ud-mb-2 ud-block ud-text-base ud-font-medium ud-text-white">
                        Balance
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={isLoading ? 'Loading...' : data?.formatted}
                        className="text-white ud-w-full ud-rounded-md ud-border ud-border-stroke ud-bg-[#353444] ud-py-3 ud-px-6 ud-text-base ud-font-medium ud-text-body-color ud-outline-none ud-transition-all focus:ud-bg-[#454457] focus:ud-shadow-input"
                        readOnly
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={async () => refetch()}
                        className="hover:ud-shadow-form ud-w-full ud-rounded-md ud-bg-primary ud-py-3 ud-px-8 ud-text-center ud-text-base ud-font-semibold ud-text-white ud-outline-none"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
