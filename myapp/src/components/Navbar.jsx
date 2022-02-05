import React, {useContext} from 'react';
import logo from './../images/logo.png';
// import gun from '../images/Guns/Light/CZ-Scorpion-removebg-preview.png'
import {TransactionContext} from "../context/TransactionContext"

const NavBarItem = ({title,classprops}) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
)

const Navbar = () => {
  const {currentAccount} = useContext(TransactionContext)
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-41 h-15 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
      {["Transactions","Weapons","Store"].map((item,index) =>(
          <NavBarItem key={item+index} title={item}/>
      ))}
        <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
        {currentAccount ? `${currentAccount.slice(0, 5)}…${currentAccount.slice(currentAccount.length - 4)}`
 : "Login"}
        </li>
    </ul>

  </nav>
  );
}

export default Navbar;
