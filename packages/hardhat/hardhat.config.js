require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // defaultNetwork: "matic",
  // networks: {
  //   hardhat: {
  //   },
  //   mumbai: {
  //     url: "https://rpc-mumbai.maticvigil.com",
  //     accounts: [process.env.PRIVATE_KEY]
  //   }
  // },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};