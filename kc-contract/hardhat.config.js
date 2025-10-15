require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const { PRIVATE_KEY, SEPOLIA_RPC_URL, SEPOLIA_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: SEPOLIA_API_KEY
  }
};
