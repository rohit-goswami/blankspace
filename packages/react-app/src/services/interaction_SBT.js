import { ethers } from 'ethers';
import SBT from '../../../hardhat/artifacts/contracts/SBT.sol/SBT.json';

const SBTAddress = '';

async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function newProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

function instanceContract(address, abi, signer) {
    return new ethers.Contract(address, abi, signer);
}

export async function mint(address,URI){
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(SBTAddress, SBT.abi, signer);
        const tx = await contract.mint(address, URI);
        await tx.wait();
    }
}

export async function revoke(tokenID){
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(SBTAddress, SBT.abi, signer);
        const tx = await contract.revoke(tokenID);
        await tx.wait();
    }
}