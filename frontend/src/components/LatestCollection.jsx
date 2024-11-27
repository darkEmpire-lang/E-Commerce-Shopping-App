import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Correct import
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext) || {}; // Safe destructuring with default value
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 15)); // Set the first 10 products
  }, [products]); // Add products as dependency

  return (
    <div className='my-20'>
      <div className='text-center py-8'>
        {/* Title component */}
        <Title text1={'LATEST'} text2={' COLLECTIONS '} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis maxime sed iusto in impedit.
          Iste consectetur, ducimus quos placeat distinctio, eaque dolores, beatae laboriosam ut expedita earum sequi fugiat eius.
        </p>
      </div>

      {/* Products display */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {/* Render products with 5 items per row */}
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
