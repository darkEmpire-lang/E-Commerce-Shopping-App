import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle modal toggle
  const openModal = () => {
    setShowModal(true);
    setShowDropdown(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="w-[18%] min-h-screen bg-white shadow-lg border-r border-gray-200 p-4">
        {/* Profile Section */}
        <div className="relative">
          <div
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 rounded-md"
            onClick={toggleDropdown}
          >
            <img
              src={assets.agent}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-gray-300"
            />
            <p className="hidden md:block text-gray-700 font-medium">Delivery Officer Dashboard</p>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-12 left-0 bg-white shadow-md rounded-md w-48 border border-gray-200">
              <button
                onClick={openModal}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                ✏ Update Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                🚪 Log Out
              </button>
            </div>
          )}
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Sidebar Menu */}
        <nav className="flex flex-col gap-3">
          <NavLink
            to="/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-all"
          >
            <img className="w-5 h-5" src={assets.order_icon} alt="Orders Icon" />
            <p className="hidden md:block text-gray-700 font-medium">All Orders</p>
          </NavLink>

          {/* <NavLink
            to="/delivery"
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-all"
          >
            <img className="w-5 h-5" src={assets.report} alt="Assigned Orders" />
            <p className="hidden md:block text-gray-700 font-medium">Assigned Orders</p>
          </NavLink> */}

          {/* <NavLink
            to="/agent"
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-all"
          >
            <img className="w-5 h-5" src={assets.report} alt="Add Agents" />
            <p className="hidden md:block text-gray-700 font-medium">Add Agents</p>
          </NavLink> */}

          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 transition-all"
          >
            <img className="w-5 h-5" src={assets.mm} alt="Dashboard" />
            <p className="hidden md:block text-gray-700 font-medium">Dashboard</p>
          </NavLink>
        </nav>
      </div>

     
    </>
  );
};

export default Sidebar;
