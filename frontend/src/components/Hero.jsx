import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';



// Furniture Images
const images = [assets.sofa,assets.sofa2]; // Update with furniture images

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col sm:flex-row border border-gray-300 overflow-hidden h-[70vh] bg-gray-50">
      {/* Left Side - Text Content */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-6 sm:py-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100">
        <div className="text-center sm:text-left text-[#333] px-6">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <p className="w-7 md:w-9 h-[1px] bg-[#333]"></p>
            <p className="font-medium text-xs md:text-sm">ELEVATE YOUR SPACE</p>
          </div>
          <h1 className="prata-regular text-2xl sm:py-3 lg:text-4xl font-semibold leading-snug">
            Premium Furniture, Timeless Elegance
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Discover high-quality, stylish furniture for every room.
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
            <button className="bg-[#333] text-white py-2 px-5 text-sm font-medium uppercase hover:bg-[#555] transition-all">
              Shop Collection
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image Slider */}
      <div className="w-full sm:w-1/2 relative h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Furniture ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
