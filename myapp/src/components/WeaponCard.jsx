import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import {FaEthereum} from 'react-icons/fa';




export const WeaponCard = ({price,weapon,url}) => {

  const {handleNewTransaction,selectedWeaponShop,handleSelectedWeapon} = useContext(TransactionContext)

  const handleBuy = (w) => {
    console.log(w);
    // calling new transaction function with the input data on the transaction context component.  
    handleNewTransaction(true);

  };

  return (
    <div className="blue-glassmorphism m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-1">
        <div className="display-flex justify-start w-full mb-2 p-2">
          {weapon && (
            <>
              <br />
              <p className="text-white text-base">Name: {weapon}</p>
            </>
          )}
          <p className="text-white text-base">Price: {price} ETH</p>
        </div>
        <img
          
          src={url}
          alt={"weapon"}
          className="w-25 h-50 2xl:h-96 rounded-md shadow-lg"
        />
        <div className="flex cursor-pointer bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl" onClick={()=>handleSelectedWeapon(weapon,price)}>
          <p className="text-left text-[#37c7da] font-bold">{price}<FaEthereum/></p>

        </div>
      </div>
    </div>
  );
};

