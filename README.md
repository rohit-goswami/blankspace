# blankSpace

![alt text](https://github.com/rohit-goswami/blankspace/blob/main/packages/react-app/public/Banner.svg?raw=true)

## Overview

We are trying to bridge the gap between organizations and skilled people using Blockchain. 

All the Smart Contracts have been deployed to Polygon Mumbai Testnet

| Contract |Address |
| --- | --- |
| Interface | 0x2B3283c1FB6cD361ACd3a837F8AB6BDD822531B6 |


## Installation


1. Clone the repo in your local system using command
```
git clone https://github.com/rohit-goswami/blankspace.git
```
2. Install dependencies for each sub-directories hardhat, react-app and subgraph

```
npm i
```
3. Create `.env` file and add your PRIVATE_KEY of your wallet

4. Compile the contracts from packages directory
```
npm run compile
```
5. Run hardhat node in separate terminal to start local blockchain
```
npm run node
```
6. Deploy contracts to local blockchain
```
npm run deploy
```
7. Run react-app from packages directory
```
npm run start
```
