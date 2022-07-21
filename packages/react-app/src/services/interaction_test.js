import { ethers } from 'ethers';
import Test from '../contracts/Test.sol/Test.json';

const testAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function newProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

function instanceContract(address, abi, signer) {
    return new ethers.Contract(address, abi, signer);
}

export async function storeCID(cid) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(testAddress, Test.abi, signer);
        const tx = await contract.uploadTest(cid.toString());
        await tx.wait();
    }
}

export async function getTestCount(address) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(testAddress, Test.abi, provider);
        const tx = await contract.getTestCount(address);
        return tx;
    }
}

export async function getTestDetails(address, index) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(testAddress, Test.abi, provider);
        const tx = await contract.getTestDetails(address, index);
        return tx;
    }
}
