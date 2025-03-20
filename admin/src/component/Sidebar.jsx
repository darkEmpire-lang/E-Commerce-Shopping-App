import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-2 border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 pt-6 pl-6 text-[15px]">
        {/* Add Items Section */}
        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
          <p className="hidden md:block text-gray-700 font-medium">Add Furniture</p>
        </NavLink>
        <hr className="border-t border-gray-200" /> {/* Divider between sections */}

        {/* List Items Section */}
        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.list_icon} alt="List Icon" />
          <p className="hidden md:block text-gray-700 font-medium">List Furnitures</p>
        </NavLink>
        <hr className="border-t border-gray-200" /> {/* Divider between sections */}

        {/* Orders Section */}
        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders Icon" />
          <p className="hidden md:block text-gray-700 font-medium">Orders</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.chart} alt="Orders Icon" />
          <p className="hidden md:block text-gray-700 font-medium">Charts</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.report} alt="Orders Icon" />
          <p className="hidden md:block text-gray-700 font-medium">Reports</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all"
          to="/delivery"
        >
          <img className="w-5 h-5" src={assets.report} alt="Orders Icon" />
          <p className="hidden md:block text-gray-700 font-medium">Assigned Orders</p>
        </NavLink>

        {/* <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all"
          to="/agent"
        >
          <img className="w-5 h-5" src={assets.report} alt="Orders Icon" />
          <p className="hidden md:block text-gray-700 font-medium">Add Agents</p>
        </NavLink> */}

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all"
          to="/agents"
        >
          <img className="w-5 h-5" src={assets.report} alt="Orders Icon" />
          <p className="hidden md:block text-gray-700 font-medium">Available Agents</p>
        </NavLink>


      </div>
    </div>
  );
};

export default Sidebar;
