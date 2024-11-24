import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}> {/* Corrected template literal for URL */}
      <div className='overflow-hidden'>
        {/* Product Image */}
        <img 
          className='hover:scale-110 transition ease-in-out' 
          src={image[0]} 
          alt=""
        />
      </div>
      
      {/* Product Name */}
      <p className='pt-3 pb-1 text-sm'>{name}</p>  {/* Display Product Name */}
      
      {/* Product Price */}
      <p className='text-sm font-medium'>{currency}{price}</p>  {/* Display Product Price with Currency */}
    </Link>
  );
};

export default ProductItem;
