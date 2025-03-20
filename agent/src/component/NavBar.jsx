import React from "react";
import { assets } from "../assets/assets.js";

const NavBar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4 px-[5%] justify-between bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md">
      {/* Logo */}
      {/* <img
        className="w-[max(10%,80px)] sm:w-[max(8%,100px)] cursor-pointer transition-transform transform hover:scale-110 drop-shadow-lg"
        src={assets.Fashion_Logo}
        alt="Logo"
      /> */}

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="ml-auto bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:scale-105 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
