import { ethers } from 'ethers';
import Interface from '../contracts/Interace.sol/Interface.json';

const InterfaceAddress = 'COPY_ADDRESS_OF_CONTRACT';

async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function newProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

function instanceContract(address, abi, signer) {
    return new ethers.Contract(address, abi, signer);
}

// To create a new smart contract and sotre the cid onchain
export async function createSBT(name, symbol,cidImage,cidTest) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.createSBT(name, symbol,cidImage,cidTest);
        await tx.wait();
    }
}

// To mint a new SBT
export async function mintSBT(contractAddress, to,cidImage) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.mint(contractAddress,to,cidImage);
        await tx.wait();
    }
}

// To revoke a SBT
export async function revokeSBT(contractAddress, tokenID) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.revoke(contractAddress,tokenID);
        await tx.wait();
    }
}

// To store onchain the submission
export async function newSubmission(cidSubmission,contractAddress) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.newSubmission(cidSubmission,contractAddress);
        await tx.wait();
    }
}

// To get all the test
export async function getAllTests() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.getAllTests();
        return tx;
    }
}

// To get all the test of a company
export async function getAllTestsOfACompany(companyAddress) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.getAllTestsOfACompany(companyAddress);
        return tx;
    }
}
// To get all the submissions
export async function getAllSubmissions() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.getAllSubmissions();
        return tx;
    }
}
// To get all the test submissions of a test
export async function getAllSubmissionsOfATest(contractAddress) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.getAllSubmissionsOfATest(contractAddress);
        return tx;
    }
}