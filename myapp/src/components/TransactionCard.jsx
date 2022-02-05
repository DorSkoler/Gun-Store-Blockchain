import React, { useContext } from "react";

export const TransactionCard = ({addressFrom,addressTo,amount,weapon,url}) => {
  console.log();
  return (
    <div className="blue-glassmorphism m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {addressFrom}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {addressTo}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {weapon && (
            <>
              <br />
              <p className="text-white text-base">Weapon: {weapon}</p>
            </>
          )}
        </div>
        <img
          src={url}
          alt="weapon"
          className="w-full h-50 2xl:h-96 rounded-md shadow-lg"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">timestamp</p>
        </div>
      </div>
    </div>
  );
};

