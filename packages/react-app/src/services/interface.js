import { ethers } from 'ethers';
import Interface from '../contracts/Interface.sol/Interface.json';

const InterfaceAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F';

async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function newProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

function instanceContract(address, abi, signer) {
    return new ethers.Contract(address, abi, signer);
}

/**
 * SBTFactory Functions
 */

// To know if an account is allowed to create test, return a boolean.
export async function createSBTAllowed(account) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        const tx = await contract.createSBTAllowed(account);
        return tx;
    }
}

// To create a new smart contract and sotre the cid onchain
export async function createSBT(name, symbol, cidImage, cidTest, uidTest) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.createSBT(name, symbol, cidImage, cidTest, uidTest);
        await tx.wait();
    }
}

/**
 * SBT Functions
 */

// To mint a new SBT
export async function mintSBT(contractAddress, to, cidImage) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.mint(contractAddress, to, cidImage);
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
        const tx = await contract.revoke(contractAddress, tokenID);
        await tx.wait();
    }
}

// To get the owner of a SBT
export async function getOwnerOfToken(contractAddress,tokenID) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        return contract.getOwnerOfToken(contractAddress,tokenID);
    }
}


/**
 * TestContract Functions
 */

// Get a Test by its uid
export async function getTestById(uidTest) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        return contract.getTestById(uidTest);
    }
}

// Get all the tests
export async function getAllTests() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        return contract.getAllTests();
    }
}

// Get all the tests of the owner
export async function getAllTestsByOwner(ownerAddress) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        return contract.getAllTestsByOwner(ownerAddress);
    }
}

/**
 * SumbissionContract Functions
 */

// To store onchain a new submission
export async function newSubmission(uidSubmission, uidTest, cidSubmission, sbt) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.newSubmission(uidSubmission, uidTest, cidSubmission, sbt);
        await tx.wait();
    }
}

// To get a specific submission
export async function getSubmissionById(uidSubmission) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        return contract.getSubmissionById(uidSubmission);
    }
}

// To get all the test submissions of a test
export async function getAllSubmissionsByTest(uidTest) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        return contract.getAllSubmissionsByTest(uidTest);
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
// To set the result of a submission, pass a 1 if the submission is passed.
// or 2 if the submission is failed.
export async function setResultSubmission(uidSubmission, result) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.setResultSubmission(uidSubmission, result);
        await tx.wait();
    }
}

export async function setSubmissionPassed(uidSubmission) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.setSubmissionPassed(uidSubmission);
        await tx.wait();
    }
}

export async function setSubmissionFailed(uidSubmission) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(InterfaceAddress, Interface.abi, signer);
        const tx = await contract.setSubmissionFailed(uidSubmission);
        await tx.wait();
    }
}

/**
 * Events Functions
 */

export async function eventCreateSBT() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        contract.on('CreateSBT', (from, sbt, event) => {
            console.log({ from, sbt, event });
        });
    }
}

export async function eventMint() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        contract.on('Mint', (to, tokenId, sbt, event) => {
            console.log({ to, tokenId,sbt, event });
        });
    }
}

export async function eventRevoke() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        contract.on('Revoke', (from, tokenID, sbt, event) => {
            console.log({ from, tokenID, sbt, event });
        });
    }
}

export async function eventNewTest() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        contract.on('NewTest', (from, uid, sbt, event) => {
            console.log({ from, uid, sbt, event });
        });
    }
}

export async function eventNewSubmission() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        contract.on('NewSubmission', (from, uid, sbt, event) => {
            console.log({ from, uid, sbt, event });
        });
    }
}

export async function eventSetSubmissionPassed() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        contract.on('SetSubmissionPassed', (from, uid, event) => {
            console.log({ from, uid, event });
        });
    }
}

export async function eventSetSubmissionFailed() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(InterfaceAddress, Interface.abi, provider);
        contract.on('SetSubmissionFailed', (from, uid, event) => {
            console.log({ from, uid, event });
        });
    }
}
