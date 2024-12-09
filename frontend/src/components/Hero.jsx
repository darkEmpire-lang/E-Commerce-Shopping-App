import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

// Image paths
const images = [assets.Black, assets.hero_img, assets.White_post]; // Add as many images as needed

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 overflow-hidden h-[70vh]">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-6 sm:py-0 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100">
        <div className="text-center sm:text-left text-[#414141] px-4">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <p className="w-7 md:w-9 h-[1px] bg-[#414141]"></p>
            <p className="font-medium text-xs md:text-sm">OUR BEST SELLERS</p>
          </div>
          <h1 className="prata-regular text-2xl sm:py-3 lg:text-4xl leading-snug">
            Latest Arrivals
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <p className="font-semibold text-xs md:text-sm cursor-pointer hover:underline">
              SHOP NOW
            </p>
            <p className="w-7 md:w-9 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero right side with image transitions */}
      <div className="w-full sm:w-1/2 relative h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
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
