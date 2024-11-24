import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const{setShowSearch,getCartCount,navigate,token,setToken,setcartItems}=useContext(ShopContext);


  const logout=()=>{

    localStorage.removeItem('token')
    setToken('')
    setcartItems({})
    navigate('/login')
    
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      {/* Logo */}
     
     <Link to='/'> <img src={assets.logo} className='w-36' alt="" /></Link>

      {/* Desktop Nav Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        
        <div className='group relative'>
          <Link to='/login'><img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" /></Link>
         {token &&
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>


         }
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 cursor-pointer' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt=""
        />

        {/* Sidebar Menu for Small Screens */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transform transition-all duration-300 ${
            visible ? 'w-3/4' : 'w-0'
          }`}
        >
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p>Back</p>
          </div>

          {/* Stacked Nav Links */}
          <div className='flex flex-col'>
            <NavLink
              to='/'
              className='py-3 px-6 border-b text-gray-700'
              onClick={() => setVisible(false)}
            >
              HOME
            </NavLink>
            <NavLink
              to='/collection'
              className='py-3 px-6 border-b text-gray-700'
              onClick={() => setVisible(false)}
            >
              COLLECTION
            </NavLink>
            <NavLink
              to='/about'
              className='py-3 px-6 border-b text-gray-700'
              onClick={() => setVisible(false)}
            >
              ABOUT
            </NavLink>
            <NavLink
              to='/contact'
              className='py-3 px-6 border-b text-gray-700'
              onClick={() => setVisible(false)}
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
