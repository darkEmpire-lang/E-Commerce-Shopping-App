import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";


const AdminNavbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setcartItems,
    userRole, // Assuming userRole is available and indicates if the user is an admin
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setcartItems({});
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo3}
          className="w-full sm:w-44 md:w-48 max-w-xs mx-auto transform transition-all duration-300 hover:scale-110 object-contain"
          alt="Logo"
        />
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 group relative hover:text-blue-600 transition-all duration-300"
        >
          <p>Home</p>
          <div className="absolute left-0 right-0 bottom-[-5px] w-0 bg-blue-600 h-[1.5px] group-hover:w-full transition-all duration-300"></div>
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 group relative hover:text-blue-600 transition-all duration-300"
        >
          <p>Collection</p>
          <div className="absolute left-0 right-0 bottom-[-5px] w-0 bg-blue-600 h-[1.5px] group-hover:w-full transition-all duration-300"></div>
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 group relative hover:text-blue-600 transition-all duration-300"
        >
          <p>About</p>
          <div className="absolute left-0 right-0 bottom-[-5px] w-0 bg-blue-600 h-[1.5px] group-hover:w-full transition-all duration-300"></div>
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 group relative hover:text-blue-600 transition-all duration-300"
        >
          <p>Contact</p>
          <div className="absolute left-0 right-0 bottom-[-5px] w-0 bg-blue-600 h-[1.5px] group-hover:w-full transition-all duration-300"></div>
        </NavLink>
        
        {/* Admin Link for Desktop - Only visible for admin users */}
        {userRole === "admin" && (
          <NavLink
            to="/admin"
            className="flex flex-col items-center gap-1 group relative hover:text-blue-600 transition-all duration-300"
          >
            <p>Admin Dashboard</p>
            <div className="absolute left-0 right-0 bottom-[-5px] w-0 bg-blue-600 h-[1.5px] group-hover:w-full transition-all duration-300"></div>
          </NavLink>
        )}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer transition-all duration-300 hover:scale-110"
          alt="Search Icon"
        />

        <div className="group relative">
          <Link to="/login">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer transition-all duration-300 hover:scale-110"
              alt="Profile Icon"
            />
          </Link>
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer transition-all duration-300 hover:scale-110"
            alt="Cart Icon"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden transition-all duration-300 hover:scale-110"
          alt="Menu Icon"
        />

        {/* Sidebar Menu for Small Screens */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transform transition-all duration-300 ${
            visible ? "w-3/4" : "w-0"
          }`}
        >
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Back Icon"
            />
            <p>Back</p>
          </div>

          {/* Stacked Nav Links */}
          <div className="flex flex-col">
            <NavLink
              to="/"
              className="py-3 px-6 border-b text-gray-700 hover:text-blue-600 transition-all duration-300"
              onClick={() => setVisible(false)}
            >
              HOME
            </NavLink>
            <NavLink
              to="/collection"
              className="py-3 px-6 border-b text-gray-700 hover:text-blue-600 transition-all duration-300"
              onClick={() => setVisible(false)}
            >
              COLLECTION
            </NavLink>
            <NavLink
              to="/about"
              className="py-3 px-6 border-b text-gray-700 hover:text-blue-600 transition-all duration-300"
              onClick={() => setVisible(false)}
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              className="py-3 px-6 border-b text-gray-700 hover:text-blue-600 transition-all duration-300"
              onClick={() => setVisible(false)}
            >
              CONTACT
            </NavLink>
            
            {/* Admin Sidebar Link */}
            {userRole === "admin" && (
              <NavLink
                to="/admin"
                className="py-3 px-6 border-b text-gray-700 hover:text-blue-600 transition-all duration-300"
                onClick={() => setVisible(false)}
              >
                Admin Dashboard
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
