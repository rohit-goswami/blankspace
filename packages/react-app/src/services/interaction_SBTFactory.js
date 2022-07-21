import { ethers } from 'ethers';
import SBTFactory from '../../../hardhat/artifacts/contracts/SBTFactory.sol/SBTFactory.json';

const SBTFactoryAddress = '';

async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function newProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

function instanceContract(address, abi, signer) {
    return new ethers.Contract(address, abi, signer);
}

export async function createSBT(name, symbol) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(SBTFactoryAddress, SBTFactory.abi, signer);
        const tx = await contract.createSBT(name, symbol);
        await tx.wait();
    }
}
