
const { Web3Storage, File } = require("web3.storage");
// const dotenv = require('dotenv').config();

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

  //get web3.storage access token
  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMyYzcxYTk3NUQxNUM1MjhlNTUzRUQ1MDg3NjJEMjJGOTUzNDUxNTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTgyMjQ3NDk0MDMsIm5hbWUiOiJibGFua1NwYWNlIn0.vUg6URGEsfsIPJRej5tJZMPiQOrctJqAhVp8GNnQi74";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  const testMetadata = {
    owner: "",
    title: "Solidity",
    description: "Basic Solidity Test",
    level: 1,
    time: 30,
    questions: [
      {
        order: 1,
        question: "Are semicolons required?",
        singleAnswer: true,
        options: [
          {
            order: 1,
            option: "Yes",
            correct: true,
          },
          {
            order: 2,
            option: "No",
          },
        ],
      },
      {
        order: 2,
        question: "What is the first line you have to write in a contract?",
        singleAnswer: true,
        options: [
          {
            order: 1,
            option: "Require",
            correct: true,
          },
          {
            order: 2,
            option: "Import",
          },
          {
            order: 3,
            option: "Pragma",
          },
        ],
      },
    ],
  };

  async function storeFiles(testMetadata) {
    const client = makeStorageClient();
    const myJSON = JSON.stringify(testMetadata);
    const file = new File([myJSON], "metadata.json", { type: "json" });
    const cid = await client.put([file]);
    return cid;
  }

  const _cid = await storeFiles(testMetadata);
  console.log("CID returned by web3.storage: 🤖  ", _cid);

  //store hash onchain
  const tx2 = await contract.uploadTest(_cid.toString(), {
    from: deployer.getAddress(),
  });

  //total tests count
  const count = await contract.getTestCount(deployer.getAddress());
  console.log("Total test stored on-chain :", count);

  const testDetails = await contract.getTestDetails(deployer.getAddress(), 0);
  console.log("test 1 details: ", testDetails);
  console.log("CID retrive from on-chain: 😍", testDetails._ipfsHash);

  async function retrieveFiles(cid) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
        throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
    }
    const files = await res.files();
    for (const file of files) {
      // console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
      const answer = await file.text();
      // console.log(answer);
      return answer;
    }
  }

  console.log(await retrieveFiles(testDetails._ipfsHash));
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
