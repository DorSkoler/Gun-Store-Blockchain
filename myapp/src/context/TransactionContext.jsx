import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddressABI } from "../utils_contract/details";

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  // state for wallet account
  const [currentAccount, setCurrentAccount] = useState("");
  //state for the user data for new transaction
  const [userInputData, setUserInputData] = useState({
    addressTo: "",
    amount: "",
    weapon: "",
    certification: "",
  });
  const [transactions, setTransactions] = useState([]);


  //handle user accounts and if accounts has changed
  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please connect to MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        //need to add the transactions of the account
      } else {
        console.log(accounts);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Eth Object");
    }
  };
  // handle new connection for metamask account
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please connect to MetaMask.");
      //getting the ethereum account after user connects his account.
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Eth Object");
    }
  };

  // handle user input for new transaction, on every change this function will change the state of the new data
  //for the new transaction and change it with the right inputType, for example, 'addressTo' changed from '0x3' to '0x5'
  const handleChange = (e, inputType) => {
    console.log(inputType);
    setUserInputData((prevState) => ({
      ...prevState,
      [inputType]: e.target.value,
    }));
  };
  const handleNewTransaction = async () => {
    try {
      if (!ethereum) return alert("Please connect to MetaMask.");

      console.log(userInputData);

      // new ethereum contract with the ABI and details of signer by the provider
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const TsxContract = new ethers.Contract(
        contractAddressABI,
        contractABI,
        signer
      );

      console.log({
        provider,
        signer,
        TsxContract,
      });

      //ethereum request for sending the new transaction with metamask
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: userInputData.addressTo,
            //The value transferred for the transaction in WEI.
            //Parse the ether string representation of ether into a number instance of the amount of wei.
            value: ethers.utils.parseEther(userInputData.amount)._hex,
          },
        ],
      });
      //adding the new transaction to the blockchain with the solidity contract
      const tsHash = await transactionsContract.addToBlockchain(
        userInputData.addressTo,
        ethers.utils.parseEther(userInputData.amount)._hex,
        userInputData.weapon,
        userInputData.certification
      );
      
    } catch (error) {
      console.log(error);
      throw new Error("No Eth Object");
    }
  };

  //use effect that always checking whether a wallet is connected, the pages renders for every change.
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        userInputData,
        handleChange,
        handleNewTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
