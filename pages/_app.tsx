import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3Modal } from '@web3modal/react';
import { chains, providers } from '@web3modal/ethereum';

// Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_ID)
  throw new Error(
    'You need to provide NEXT_PUBLIC_WALLET_CONNECT_ID env variable'
  );

// Configure web3modal
const modalConfig = {
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  theme: 'dark' as const,
  accentColor: 'default' as const,
  ethereum: {
    appName: 'web3Modal',
    autoConnect: true,
    chains: [chains.goerli],
    providers: [
      providers.walletConnectProvider({
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
      }),
    ],
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Web3Modal config={modalConfig} />
    </>
  );
}
