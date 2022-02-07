import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// dor address: 0xC77eBb0057E5534efeDBb46360D92CbDA2807B68
// shahaf address: 0x43A0726774FCbece727A78C818fF7be9D89a8ADb
// gunstore address: 0x4aF7c85FC637aFD8E6e17903e165667343136ce7
const gunStoreAddress = '0x4aF7c85FC637aFD8E6e17903e165667343136ce7'
import { contractABI, contractAddressABI } from "../utils_contract/details";

export const TransactionContext = React.createContext();

const { ethereum } = window;
const createContractEth = () =>{
   // new ethereum contract with the ABI and details of signer by the provider
   const provider = new ethers.providers.Web3Provider(ethereum);
   const signer = provider.getSigner();

   const tsxContract = new ethers.Contract(
     contractAddressABI,
     contractABI,
     signer
   );   


   return tsxContract;
}
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
  const [accountTransactions, setTransactions] = useState([]);

  const getAccountTransactions = async () =>{
    try {
        if(ethereum){
          const tsxContract = createContractEth();
          const transactions = await tsxContract.getTransactions();
          console.log(transactions);

          const newTsxData = transactions.map((ts) =>({
            addressTo: ts.reciever,
            addressFrom: ts.sender,
            timestamp: new Date(ts.timestamp.toNumber()*1000).toLocaleString(),
            weapon: ts.weapon,
            //WEI to ETH 10^18
            amount: parseInt(ts.amount._hex) /(10**18)

          }))
          console.log(newTsxData);
          setTransactions(newTsxData)
        }
        else{
            console.log("Etheruem problem, try again");
        }
    } catch (error) {
      console.log(error);
    }
  }
  //handle user accounts and if accounts has changed
  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please connect to MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        //set the account to be our main account(0)
        setCurrentAccount(accounts[0]);
        //setting the account transactions so we can show his data as the current state.
        getAccountTransactions()
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
  const handleNewTransaction = async (flag) => {
    try {
      if (!ethereum) return alert("Please connect to MetaMask.");

      console.log(userInputData);

      // new ethereum contract with the ABI and details of signer by the provider
      const tsxContract = createContractEth()

   
      
      //ethereum request for sending the new transaction with metamask
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: flag ? gunStoreAddress : userInputData.addressTo,
            //The value transferred for the transaction in WEI.
            //Parse the ether string representation of ether into a number instance of the amount of wei.
            value: flag ? ethers.utils.parseEther("0.00001")._hex :ethers.utils.parseEther(userInputData.amount)._hex,
          },
        ],
      });
    
      //adding the new transaction to the blockchain with the solidity contract
      const tsHash = await tsxContract.addToBlockchain(
        flag ? gunStoreAddress: userInputData.addressTo,
        flag ? ethers.utils.parseEther("0.00001")._hex : ethers.utils.parseEther(userInputData.amount)._hex,
        flag ? "test" : userInputData.weapon,
      );
      // ^^^^^ NEED TO SEE HOW WE PASS PARAMS TO ADD BLOCKCHAIN ^^^^^^^^^
      
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
        accountTransactions,
        handleChange,
        handleNewTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
