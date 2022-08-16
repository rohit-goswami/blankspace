# blankSpace

![alt text](https://github.com/rohit-goswami/blankspace/blob/main/packages/react-app/public/Banner.svg?raw=true)

## Overview

We are trying to bridge the gap between organizations and skilled people using Blockchain. 

All the Smart Contracts have been deployed to Polygon Mumbai Testnet, so use mumbai testnet in metamask to access the features of the website.

| Contract |Address |
| --- | --- |
| Interface | 0x2B3283c1FB6cD361ACd3a837F8AB6BDD822531B6 |

### Fleek Deployment 

https://blankspace-alpha.on.fleek.co/

### Whitepaper 
https://drive.google.com/file/d/15tdHIoT6WHYc18UGG2sXnA_Aih7zS0M5/view?usp=sharing

## [ NOTE ]

In order to create a test, your wallet address has to be in the whitelist, if you want to try to create a test in PoS-Arena, email your wallet address and we will add it immediately. 

Email: lynus.mascot@gmail.com

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
## License

Copyright (c) 2022 Rohit Goswami

Released under the [MIT License](https://github.com/go-gorm/gorm/blob/master/License)
