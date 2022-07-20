import { Web3Storage, File } from 'web3.storage';

function getAccessToken() {
    return process.env.TOKEN;
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
}

async function storeFiles(content) {
    const client = makeStorageClient();
    const myJSON = JSON.stringify(content);
    const file = new File([myJSON], 'metadata.json', { type: 'json' });
    const cid = await client.put([file]);
    return cid;
}

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
const content = {
    owner: 'josep',
    title: 'Solidity',
    description: 'Basic Solidity Test',
    level: 1,
    time: 30,
    questions: [
        {
            order: 1,
            question: 'Are semicolons required?',
            singleAnswer: true,
            options: [
                {
                    order: 1,
                    option: 'Yes',
                    correct: true,
                },
                {
                    order: 2,
                    option: 'No',
                },
            ],
        },
        {
            order: 2,
            question: 'What is the first line you have to write in a contract?',
            singleAnswer: true,
            options: [
                {
                    order: 1,
                    option: 'Require',
                    correct: true,
                },
                {
                    order: 2,
                    option: 'Import',
                },
                {
                    order: 3,
                    option: 'Pragma',
                },
            ],
        },
    ],
};
const cid = await storeFiles(content);
console.log(cid);
const file = await retrieveFiles(`${cid}`); // https://ipfs.io/ipfs/cid
console.log(file);
