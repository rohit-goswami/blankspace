import { ethers } from 'ethers';
import Interface from '../contracts/Interface.sol/Interface.json';

const InterfaceAddress = '0x2B3283c1FB6cD361ACd3a837F8AB6BDD822531B6';

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

const InterfaceAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sbt",
          "type": "address"
        }
      ],
      "name": "CreateSBT",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sbt",
          "type": "address"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "uid",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sbt",
          "type": "address"
        }
      ],
      "name": "NewSubmission",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "uid",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sbt",
          "type": "address"
        }
      ],
      "name": "NewTest",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sbt",
          "type": "address"
        }
      ],
      "name": "Revoke",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "uid",
          "type": "string"
        }
      ],
      "name": "SetSubmissionFailed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "uid",
          "type": "string"
        }
      ],
      "name": "SetSubmissionPassed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "addNewAccount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_cidImage",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_cidTest",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_uid",
          "type": "string"
        }
      ],
      "name": "createSBT",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "createSBTAllowed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        }
      ],
      "name": "createSBTPoM",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_uid",
          "type": "string"
        }
      ],
      "name": "getAllSubmissionsByTest",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "cidSubmission",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sbt",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "internalType": "enum SubmissionContract.Result",
              "name": "result",
              "type": "uint8"
            }
          ],
          "internalType": "struct SubmissionContract.Submission[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllTests",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "cidImage",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cidTest",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "ownerTest",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sbt",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            }
          ],
          "internalType": "struct TestContract.Test[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getAllTestsByOwner",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "cidImage",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cidTest",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "ownerTest",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sbt",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            }
          ],
          "internalType": "struct TestContract.Test[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getBalanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getOwnerOfToken",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_uid",
          "type": "string"
        }
      ],
      "name": "getSubmissionById",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "cidSubmission",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sbt",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "internalType": "enum SubmissionContract.Result",
              "name": "result",
              "type": "uint8"
            }
          ],
          "internalType": "struct SubmissionContract.Submission",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_uid",
          "type": "string"
        }
      ],
      "name": "getTestById",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "cidImage",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cidTest",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "ownerTest",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sbt",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            }
          ],
          "internalType": "struct TestContract.Test",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "mintPoM",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_submissionId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_testId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_cidSubmission",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_sbt",
          "type": "address"
        }
      ],
      "name": "newSubmission",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "removeAccount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "revoke",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_uid",
          "type": "string"
        }
      ],
      "name": "setSubmissionFailed",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_uid",
          "type": "string"
        }
      ],
      "name": "setSubmissionPassed",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

export async function addAccount() {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        console.log('Hello1');
        const contract = new ethers.Contract('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', InterfaceAbi, provider);
        console.log('Hello2');
        const tx = await contract.addNewAccount('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
        console.log('Hello3');
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
