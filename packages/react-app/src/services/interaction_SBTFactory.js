import { ethers } from 'ethers';
import SBTFactory from '../contracts/SBTFactory.sol/SBTFactory.json';

const SBTFactoryAddress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0';

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
