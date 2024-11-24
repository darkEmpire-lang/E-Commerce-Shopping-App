import React from 'react';
import { assets } from '../assets/assets.js';

const NavBar = ({setToken}) => {
  return (
    <div className="flex items-center py-3 px-[4%] justify-between">
      {/* Logo */}
      <img
        className="w-[max(10%,80px)] sm:w-[max(8%,100px)] cursor-pointer hover:opacity-90 transition-opacity"
        src={assets.logo}
        alt="Logo"
      />
     

      {/* Logout Button */}
      <button onClick={()=>setToken('')} className="ml-auto bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-3 rounded-full text-xs sm:text-sm hover:bg-red-500 transition-colors">
        Logout
      </button>
    </div>
  );
};

export default NavBar;
