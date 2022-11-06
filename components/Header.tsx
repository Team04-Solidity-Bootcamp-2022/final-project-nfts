import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { Alert } from 'reactstrap';


const Header = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);
  
  const [warningAlert, setWarningAlert] = useState();

  // Checks if wallet is connected
	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window
		if (ethereum) {
			console.log('Got the ethereum obejct: ', ethereum)
		} else {
			console.log('No Wallet found. Connect Wallet')
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' })

		if (accounts.length !== 0) {
			console.log('Found authorized Account: ', accounts[0])
			setCurrentAccount(accounts[0])
		} else {
			console.log('No authorized account found')
		}
  }
  
  // Checks if wallet is connected to the correct network
	const checkCorrectNetwork = async () => {
		const { ethereum } = window
		let chainId = await ethereum.request({ method: 'eth_chainId' })
		console.log('Connected to chain:' + chainId)

		const goerliChainId = '0x5'

		if (chainId !== goerliChainId) {
			setCorrectNetwork(false)
		} else {
			setCorrectNetwork(true)
		}
	}

  useEffect(() => {
		checkIfWalletIsConnected()
		checkCorrectNetwork()
  }, [])
  
  // Calls Metamask to connect wallet on clicking Connect Wallet button
	const connectWallet = async () => {
		try {
			const { ethereum } = window

			if (!ethereum) {
				console.log('Metamask not detected')
				return
			}
			let chainId = await ethereum.request({ method: 'eth_chainId'})
			console.log('Connected to chain:' + chainId)

			const goerliChainId = '0x5'

			if (chainId !== goerliChainId) {
				alert('You are not connected to the Goerli Testnet!')
				return
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

			console.log('Found account', accounts[0])
			setCurrentAccount(accounts[0])
		} catch (error) {
			console.log('Error connecting to metamask', error)
		}
	}


  return (
    <header className="header ud-top-0 ud-left-0 ud-flex ud-w-full ud-items-center ud-bg-transparent ud-transition ud-fixed ud-z-50">
      <div className="ud-container">
        <div className="ud-relative ud-mx-[-16px] ud-flex ud-items-center ud-justify-between">
          <div className="ud-w-60 ud-max-w-full ud-px-4">
            <Link legacyBehavior href="/">
              <a className="header-logo ud-block ud-w-full ud-py-5 lg:ud-py-7">
                <img
                  src="images/logo.svg"
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
                    <a
                      href="index.html"
                      className="ud-mx-8 ud-flex ud-py-2 ud-text-base ud-font-semibold ud-text-white group-hover:ud-text-white lg:ud-mr-0 lg:ud-inline-flex lg:ud-py-6 lg:ud-px-0"
                    >
                      Home
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="ud-hidden ud-justify-end ud-pr-16 sm:ud-flex lg:ud-pr-0">
            {currentAccount === '' ? (
              <button
                className="ud-flex ud-items-center ud-rounded-md ud-border-2 ud-border-white ud-py-3 ud-px-6 ud-text-base ud-font-semibold ud-text-white ud-transition ud-duration-300 ud-ease-in-out hover:ud-border-primary hover:ud-bg-primary lg:ud-px-4 xl:ud-px-6"
                onClick={connectWallet}
              >
                <span className="ud-pr-2">
                  <svg
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.125 17.75V18.7083C20.125 19.2167 19.9231 19.7042 19.5636 20.0636C19.2042 20.4231 18.7167 20.625 18.2083 20.625H4.79167C3.72792 20.625 2.875 19.7625 2.875 18.7083V5.29167C2.875 4.78333 3.07693 4.29582 3.43638 3.93638C3.79582 3.57693 4.28334 3.375 4.79167 3.375H18.2083C18.7167 3.375 19.2042 3.57693 19.5636 3.93638C19.9231 4.29582 20.125 4.78333 20.125 5.29167V6.25H11.5C10.4363 6.25 9.58333 7.1125 9.58333 8.16667V15.8333C9.58333 16.3417 9.78527 16.8292 10.1447 17.1886C10.5042 17.5481 10.9917 17.75 11.5 17.75H20.125ZM11.5 15.8333H21.0833V8.16667H11.5V15.8333ZM15.3333 13.4375C14.9521 13.4375 14.5865 13.286 14.3169 13.0165C14.0473 12.7469 13.8958 12.3812 13.8958 12C13.8958 11.6188 14.0473 11.2531 14.3169 10.9835C14.5865 10.714 14.9521 10.5625 15.3333 10.5625C15.7146 10.5625 16.0802 10.714 16.3498 10.9835C16.6194 11.2531 16.7708 11.6188 16.7708 12C16.7708 12.3812 16.6194 12.7469 16.3498 13.0165C16.0802 13.286 15.7146 13.4375 15.3333 13.4375Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Wallet Connect
              </button>
            ) : correctNetwork ? (
              <button
				      className='ud-flex ud-items-center ud-rounded-md ud-border-2 ud-border-white ud-py-3 ud-px-6 ud-text-base ud-font-semibold ud-text-white ud-transition ud-duration-300 ud-ease-in-out hover:ud-border-primary hover:ud-bg-primary lg:ud-px-4 xl:ud-px-6'
				      >
              Disconnect
              </button>
            ) : (
              <Alert color="warning" isOpen={ warningAlert }>
              <span className="alert-icon">
                <i className="ni ni-like-2"></i>
              </span>
              <span className="alert-text">
                <strong>Warning!</strong>{" "}
                Please connect to the Goerli Testnet and reload the page!
              </span>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => {setWarningAlert(false)}}
              >
                  <span aria-hidden="true">&times;</span>
              </button>
          </Alert>
            )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
