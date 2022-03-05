// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {

    event Transfer(address from, address receiver, uint amount,uint256 timestamp, string weapon, string weaponType,string weaponUrl);
  
    struct Ts{
        address sender;
        address receiver;
        uint amount;
        uint256 timestamp;
        string weapon;
        string weaponType;
        string weaponUrl;

    }

    Ts[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory weapon,string memory weaponType,string memory weaponUrl) public {
        transactions.push(Ts(msg.sender, receiver, amount, block.timestamp, weapon,weaponType, weaponUrl));
        emit Transfer(msg.sender, receiver, amount, block.timestamp, weapon,weaponType, weaponUrl);
    }

    function getTransactions() public view returns (Ts[] memory) {
        return transactions;

    }

}