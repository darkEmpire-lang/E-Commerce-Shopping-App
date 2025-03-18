import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="py-10">
      {/* Footer Container */}
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-10 px-5">
        {/* Logo Section */}
        <div className="flex flex-col items-center sm:items-start">
          <img className="w-32 mb-4" src={assets.logo3} alt="Company Logo" />
          <p className="w-full md:w-2/3 text-center sm:text-left text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae autem voluptas modi id facilis aliquam aperiam.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-lg font-semibold mb-4 text-gray-700">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-gray-800 cursor-pointer">Home</li>
            <li className="hover:text-gray-800 cursor-pointer">About Us</li>
            <li className="hover:text-gray-800 cursor-pointer">Delivery</li>
            <li className="hover:text-gray-800 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-lg font-semibold mb-4 text-gray-700">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-gray-800 cursor-pointer">+9477777777</li>
            <li className="hover:text-gray-800 cursor-pointer">contact@OnlineFurniture.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-300 pt-5">
        <p className="text-sm text-gray-600 text-center">
          Copyright © 2025 OnlineFurniture Store All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
