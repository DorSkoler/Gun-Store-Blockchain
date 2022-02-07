// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 TsxCount;

    event Transfer(address from, address receiver, uint amount,uint256 timestamp, string weapon);
  
    struct Ts{
        address sender;
        address receiver;
        uint amount;
        uint256 timestamp;
        string weapon;
    }

    Ts[] transactions;
    //need to check params for new transaction.
    function addToBlockchain(address payable receiver, uint amount, string memory weapon) public {
        TsxCount += 1;
        transactions.push(Ts(msg.sender, receiver, amount, block.timestamp, weapon));
        emit Transfer(msg.sender, receiver, amount, block.timestamp, weapon);
    }

    function getTransactions() public view returns (Ts[] memory) {
        return transactions;

    }

    function getTransactionCount() public view returns (uint256) {
        return TsxCount;
    }
}
//contract address 0x676f7d285a88E9025Bd3430Ac4a31B35434F6842