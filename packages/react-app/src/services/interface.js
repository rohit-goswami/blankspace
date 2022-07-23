import { ethers } from 'ethers';
import Interface from '../contracts/Interace.sol/Interface.json';

const InterfaceAddress = '0x91096E774d298F797B57b3d5c9E65288cA24B7df';

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
export async function createSBT(name, symbol,cidImage,cidTest,uidTest) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.createSBT(name, symbol,cidImage,cidTest,uidTest);
        await tx.wait();
    }
}

// To know if an account is allowed to create test, return a boolean.
export async function createSBTAllowed(account) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.createSBTAllowed(account);
        return tx;
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

// To store onchain a new submission
export async function newSubmission(cidSubmission,contractAddress,uidSubmission) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.newSubmission(cidSubmission,contractAddress,uidSubmission);
        await tx.wait();
    }
}

// To set the result of a submission, pass a 1 if the submission is passed.
// or 2 if the submission is failed.
export async function setResultSubmission(uidSubmission,result) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.setResultSubmission(uidSubmission,result);
        await tx.wait();
    }
}

// To get a specific test
export async function getTest(uidTest) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.getTest(uidTest);
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

// To get all the test submissions of a test
export async function getAllSubmissionsOfATest(contractAddress) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.getAllSubmissionsOfATest(contractAddress);
        return tx;
    }
}

// To get a specific submission
export async function getSubmission(uidSubmission) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.getSubmission(uidSubmission);
        return tx;
    }
}

// To get the result of submission
export async function getResultSubmission(uidSubmission) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.getResultSubmission(uidSubmission);
        return tx;
    }
}