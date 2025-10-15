const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractJSON = JSON.parse(
  fs.readFileSync("./artifacts/contracts/UserBalanceSystem.sol/UserBalanceSystem.json", "utf8")
);

const abi = contractJSON.abi;
const bytecode = contractJSON.bytecode;

async function main() {
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy(1000000);
  await contract.waitForDeployment();

  console.log("Contract deployed at:", contract.target);
}

main().catch(console.error);
