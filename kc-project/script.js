require("dotenv").config();
const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider(
        `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
    );

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // sample contract by other user
    const contractAddress = "0xf531b8f309be94191af87605cfbf600d71c2cfe0";
    const abi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function balanceOf(address) view returns (uint256)",
        "function deposit()",
        "function totalSupply() view returns (uint256)"
    ];
    const sampeContract = new ethers.Contract(contractAddress, abi, wallet);

    const name = await sampeContract.name();
    console.log("Token Name:", name);

    const symbol = await sampeContract.symbol();
    console.log("Symbol:", symbol);

    const address = await wallet.getAddress();
    console.log("Wallet address:", address);
    //   const tx = await sampeContract.deposit({ value: ethers.parseEther("0.00000000001") })
    //   await tx.wait();
    //   console.log("Done Transaction: 0.00000000001 ETH");   

    const supply = await sampeContract.totalSupply();
    console.log("Total Supply:", supply.toString());

    const balanceWETH = await sampeContract.balanceOf(address);
    console.log("Balance (in wei):", balanceWETH.toString());
    console.log("Balance (in WETH):", ethers.formatEther(balanceWETH));
    
    // from provider directly
    const balance = await provider.getBalance(address);  
    console.log("Balance (in wei):", balance.toString());
    console.log("Balance (in ETH):", ethers.formatEther(balance));

    // own contract
    const myContractAddress = "0x93412b2F0e3EF8ab414e44F50626e98FbF89E2bf"
    const myABI = [
        "function getBalance() view returns (uint)",
        "function addBalance(uint)",
        "function addUser(bytes32 id, tuple(string name, string userAddress) info)",
        "function getUser(bytes32 id) view returns (tuple(string name, string userAddress))"
    ];
    const myContract = new ethers.Contract(myContractAddress, myABI, wallet);

    const myBalance = await myContract.getBalance();
    console.log("My Balance:", myBalance.toString());

    const tx = await myContract.addBalance(500000);
    console.log("Transaction sent! Waiting for confirmation...");
    console.log("Tx hash:", tx.hash);

    const myBalanceUpdated = await myContract.getBalance();
    console.log("My Balance:", myBalanceUpdated.toString());

    const id = ethers.keccak256(ethers.toUtf8Bytes("Aldo-Jakarta"));
    console.log("ID Hash:", id.toString());

    await myContract.addUser(
        id,
        {name: "Aldo", userAddress: "Jakarta"}
    );
    console.log("Success add user");

    const user = await myContract.getUser(id);
    console.log("Name:", user.name);
    console.log("Address:", user.userAddress);

    // const recipient = "0x000000000000000000000000000000000000abcd";
    // const amountInEth = "0.000000000000001"; 

    //   const tx = await wallet.sendTransaction({
    //     to: recipient,
    //     value: ethers.parseEther(amountInEth),
    //   });

    //   console.log("Transaction sent! Waiting for confirmation...");
    //   console.log("Tx hash:", tx.hash);

    //   const receipt = await tx.wait();

    //   console.log("Transaction confirmed in block:", receipt.blockNumber);
    //   console.log("Receipt:", receipt.toJSON());
}

main().catch((err) => console.error(err));