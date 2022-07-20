import TEST_ABI from '../contracts/TEST_ABI.json';

import { ethers } from 'ethers';

function makeProvider() {
    return new ethers.providers.JsonRpcProvider();
}

function instanceContract(address,abi,signer) {
    return new ethers.Contract(address, abi, signer);
}

export async function storeCID(cid) {
    const provider =  makeProvider();
    const signer = provider.getSigner(0);
    const contract =  instanceContract("0x5fbdb2315678afecb367f032d93f642f64180aa3", TEST_ABI, signer);
    const tx = await contract.uploadTest(cid.toString());
    await tx.wait();
}

export async function getTestCount(address) {
    const provider =  makeProvider();
    const signer = provider.getSigner(0);
    const contract =  instanceContract("0x5fbdb2315678afecb367f032d93f642f64180aa3", TEST_ABI, signer);
    const tx = await contract.getTestCount(signer.getAddress());
    return tx;
}

export async function getTestDetails(address,index) {
    const provider =  makeProvider();
    const signer = provider.getSigner(0);
    const contract =  instanceContract("0x5fbdb2315678afecb367f032d93f642f64180aa3", TEST_ABI, signer);
    const testDetails = await contract.getTestDetails(signer.getAddress(), 0);
    // console.log("test 1 details: ", testDetails);
    // console.log("CID retrive from on-chain: 😍", testDetails._ipfsHash);
    return testDetails;
}

await storeCID("aahahha");
await getTestCount();
await getTestDetails();

