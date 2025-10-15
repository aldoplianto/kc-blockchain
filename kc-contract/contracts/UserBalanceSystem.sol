// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract UserBalanceSystem {
    uint private balance;
    
    struct User {
        string name;
        string userAddress;
    }

    mapping(bytes32 => User) private userMap;
    
    constructor(uint initBalance) {
        balance = initBalance;
    }

    function getBalance() public view returns (uint) {
        return balance;
    }

    function addBalance(uint _addBalance) public {
        balance += _addBalance;
    }

    function addUser(bytes32 id, User calldata info) public {
        userMap[id] = info;

        balance -= 1000;
    }

    function getUser(bytes32 id) public view returns (User memory) {
        return userMap[id];
    }
}
