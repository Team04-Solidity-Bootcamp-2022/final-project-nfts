import Header from '../../components/Header';
import Link from 'next/link';
import { useAccount } from '@web3modal/react';
import MyAccount from '../../components/account/MyAccount';
import MySales from '../../components/account/MySales';
import CreateNFT from '../../components/account/CreateNFT';
import NftList from '../../components/account/NftList';
import { useState } from 'react';

export default function Home() {
  const { account } = useAccount();

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

      <MyAccount />

      <MySales account={account} />

      <NftList account={account} />
    </>
  );
}
