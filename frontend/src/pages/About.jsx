import React from 'react';
import { assets } from '../assets/assets';  // Assuming assets.about_img is correctly set

const About = () => {
  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="container mx-auto text-center">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={assets.about_img} // Use the imported image
              alt="Fashion Clothing"
              className="w-full md:w-4/5 h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Welcome to Malka Fashion Online Clothing Shop
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              We bring you the latest and most stylish trends in fashion. From casual wear to formal
              attire, we've got something for every occasion. Our mission is to make you look and feel
              great, no matter where you go.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Shop Now
            </button>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            At Forever Online, we believe that fashion should be accessible and affordable to everyone.
            Our journey began with a single vision – to create a platform where customers can find trendy
            and high-quality clothing, all in one place. With our passion for fashion and commitment to
            customer satisfaction, we have become a trusted name in the online retail industry.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Values</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center w-full md:w-1/3 max-w-xs">
              <i className="fas fa-cogs text-blue-600 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality</h3>
              <p className="text-gray-600">
                We believe in offering the best quality products that stand the test of time.
              </p>
            </div>
            <div className="text-center w-full md:w-1/3 max-w-xs">
              <i className="fas fa-tshirt text-blue-600 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Style</h3>
              <p className="text-gray-600">
                Fashion is about expressing yourself, and we offer a wide range of styles for every
                personality.
              </p>
            </div>
            <div className="text-center w-full md:w-1/3 max-w-xs">
              <i className="fas fa-heart text-blue-600 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Care</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We aim to provide an exceptional
                shopping experience.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="600 py-12">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Join the Forever Online Family!
          </h2>
          <p className="text-lg text-white text-center mb-6">
            Stay updated on the latest trends, promotions, and new arrivals. Subscribe to our newsletter
            now and be part of our journey.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-l-lg border-2 border-gray-300 w-1/3"
            />
            <button className="bg-white text-black px-6 py-3 rounded-r-lg hover:bg-gray-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
