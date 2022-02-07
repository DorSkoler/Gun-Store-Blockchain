import React,{useState} from 'react';
import { weaponsSideBarData } from '../weapons/weaponsNavBarData';
import {Link} from 'react-router-dom'
import weaponsData from '../weapons/weaponsHardCoded'
import { WeaponCard } from '../components/WeaponCard';
import gun from '../images/Guns/Heavy/HK-G36.png'

function Weapons() {
  const [selectedWeaponType,setSelectedWeaponType] = useState("")

  const handleSelectedWeaponType = (weapon) => {
    setSelectedWeaponType(weapon);
  }
  return (<div className="flex w-full  justify-center gradient-bg-welcome">
      <div className="text-white py-12 px-8">
        <ul>
          {weaponsSideBarData.map((item,key)=>{
            return (<li className="py-5 cursor-pointer" key={key} onClick={() => handleSelectedWeaponType(item.title)}>
              <div>{item.icon}</div>
              <div>{item.title}</div>
            </li>)
          })}
        </ul>
      </div>
      <div className="flex flex-wrap justify-center items-center mt-10">
          {weaponsData.filter(data => data.type === selectedWeaponType).map((weapon,index) =>(
            <WeaponCard key={index} weapon={weapon.name} amount={"5"} addressFrom={"Store"} url={gun} addressTo={"test"}/>
          ))}

      </div>

  </div>);
}

export default Weapons;
