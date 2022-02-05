import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import {TransactionCard} from './TransactionCard'

import gun from '../images/Guns/Light/p90.png'

import weaponsData from '../weapons/weaponsHardCoded'

const Transactions = () => {
  const { currentAccount,transactions } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">Transaction list</h3>


      <div className="flex flex-wrap justify-center items-center mt-10">
          {[...weaponsData].map((transaction, i) => (
            <TransactionCard key={i} addressFrom={"0x5"} url={gun}/>
            ))}
            </div>
      </div>
    </div>
  );
};

export default Transactions;