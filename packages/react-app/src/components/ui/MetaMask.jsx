import React, { useState } from 'react';

// Material UI Icons
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// MetaMask
import MetaMaskOnboarding from '@metamask/onboarding';

// Constants
const currentUrl = new URL(window.location.href);
const forwarderOrigin = currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined;

const MetaMask = () => {
    // States
    const [metaMaskDisabled, setMetaMaskDisabled] = useState(false);

    //Created check function to see if the MetaMask extension is installed
    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    //This will start the onboarding proccess
    const install = () => {
        //We create a new MetaMask onboarding object to use in our app
        const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

        //On this object we have startOnboarding which will start the onboarding process for our end user
        onboarding.startOnboarding();
    };

    const connect = async () => {
        try {
            // Will open the MetaMask UI
            // You should disable this button while the request is pending!
            const { ethereum } = window;
            await ethereum.request({ method: 'eth_requestAccounts' });

            // We set the button disable
            setMetaMaskDisabled(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickWallet = e => {
        e.preventDefault();

        if (metaMaskDisabled) {
            return;
        }

        if (isMetaMaskInstalled()) {
            connect();
        } else {
            install();
        }
    };

    return (
        <AccountBalanceWalletIcon
            style={{
                fontSize: 32,
                cursor: 'pointer',
            }}
            onClick={handleClickWallet}
        />
    );
};

export default MetaMask;
