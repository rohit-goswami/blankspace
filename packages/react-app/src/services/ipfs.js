import { Web3Storage, File } from 'web3.storage';

function getAccessToken() {
    return process.env.REACT_APP_WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
}

export async function storeFile(content) {
    const client = makeStorageClient();
    const myJSON = JSON.stringify(content);
    const file = new File([myJSON], 'metadata.json', { type: 'json' });
    const cid = await client.put([file]);
    return cid;
}

export async function storeImage(file) {
    const client = makeStorageClient();
    const newFile = new File([file], 'sbt-image.' + file.name.split('.')[1], { type: 'image' });
    const cid = await client.put([newFile]);
    return cid;
}

export async function retrieveFiles(cid) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    if (!res.ok) {
        throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
    }
    const files = await res.files();
    for (const file of files) {
        const answer = await file.text();
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