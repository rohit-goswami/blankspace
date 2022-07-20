// 0x5FbDB2315678afecb367f032d93F642f64180aa3


const { Web3Storage, File } = require('web3.storage');

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );
  const Test = await ethers.getContractFactory("Test");
  const test = await Test.deploy();
  await test.deployed();

  console.log("Test address:", test.address);

  const contract = Test.attach(test.address);
  //const contract = await hre.ethers.getContractAt("Test", CONTRACT_ADDRESS);
  const WALLET = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
//  await contract.safeMint(WALLET_ADDRESS, URI);
 // console.log("NFT minted:", contract);

 //get web3.storage access token
 function getAccessToken () {
    return process.env.WEB3STORAGE_TOKEN;
 }

 function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
 }
 
    const testMetadata = {
        "owner": "",
        "title": "Solidity",
        "description": "Basic Solidity Test",
        "level": 1,
        "time": 30,
        "questions": [
            {
                "order": 1,
                "question": "Are semicolons required?",
                "singleAnswer": true,
                "options": [
                    {
                        "order": 1,
                        "option": "Yes",
                        "correct": true
                    },
                    {
                        "order": 2,
                        "option": "No"
                    }
                ]
            },
            {
                "order": 2,
                "question": "What is the first line you have to write in a contract?",
                "singleAnswer": true,
                "options": [
                    {
                        "order": 1,
                        "option": "Require",
                        "correct": true
                    },
                    {
                        "order": 2,
                        "option": "Import"
                    },
                    {
                        "order": 3,
                        "option": "Pragma"
                    }
                ]
            }
        ]
    };
 
 async function storeFiles (testMetadata) {
    const client = makeStorageClient();
    const myJSON = JSON.stringify(testMetadata);
    const file = new File([myJSON], 'metadata.json', { type: 'json' });
    const cid = await client.put([file]);
    return cid;
 }


 const _cid = storeFiles(testMetadata);
 const tx = await contract.setCid(_cid.toString());

 //retrive cid from contract
 const cid = await contract.cid();
 console.log("CID from contract"+ cid);

 async function retrieveFiles(cid) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    // if (!res.ok) {
    //     throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
    // }
    const files = await res.files();
    for (const file of files) {
        // console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
        const answer = await file.text();
        // console.log(answer);
        return answer;
    }
}

console.log(retrieveFiles(`${cid}`));

}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});