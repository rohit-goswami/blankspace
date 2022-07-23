/**
* @type import(‘hardhat/config’).HardhatUserConfig
*/

require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
const { POLYGON_MUMBAI_RPC_PROVIDER, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
  defaultNetwork: 'mumbai',
        networks: {
            hardhat: {},
            mumbai: {
               url: POLYGON_MUMBAI_RPC_PROVIDER,
               accounts: [`0x${PRIVATE_KEY}`],
           }
        },
        etherscan: {
           apiKey: POLYGONSCAN_API_KEY,
        },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: false,
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