import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext); // Accessing the products from the context
  const [bestseller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5)); // Get only top 5 bestseller products
  }, [products]); // Re-run whenever `products` change

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'New'} text2={' Arrivals '} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur quidem incidunt placeat, similique quasi aperiam eveniet necessitatibus asperiores omnis nobis ex dignissimos, natus aliquid nostrum aut debitis aliquam, voluptas quod.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestseller.map((item, index) => (
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
  )
}

export default BestSeller;
