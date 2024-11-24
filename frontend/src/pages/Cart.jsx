import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, delivery_fee ,navigate} = useContext(ShopContext); // Removed unused variables
  const [cartData, setCartData] = useState([]);

  // Update cart data whenever cartItems changes
  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      const itemSizes = cartItems[itemId];
      for (const size in itemSizes) {
        if (itemSizes[size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: itemSizes[size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (itemId, size, newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(itemId, size, newQuantity);
    }
  };

  return (
    <div className="border-t pt-14">
      {/* Title */}
      <div className="text-2xl mb-3">
        <Title text1="YOUR " text2="CART" />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          if (!productData) return null; // Skip items not found in the products list

          return (
            <div
              key={`${item._id}-${item.size}`}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {/* Product Details */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>

                <div className='flex items-center gap-5 mt-2'>

                  <p className="text-sm text-gray-500"> Price: {currency} {productData.price.toFixed(2)}</p>
                 <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50"> {item.size}</p>


               </div>
                  
                
              </div>
              </div>
              <input onChange={(e)=>e.target.value===''||e.target.value==='0'? null :updateQuantity(item._id,item.size,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
            
              <img  onClick={()=>updateQuantity(item._id,item.size,0)}className='w-4 mr-4 sm:w-5 cursor-pointer ' src={assets.bin_icon} alt="" />
            </div>
          );
        })}
      </div>


      <div className="flex justify-end my-20 px-4">
  <div className="w-full sm:max-w-sm">
    <CartTotal />

    <div className="w-full text-end mt-8">
      <button onClick={()=>navigate('/place-order')}className="bg-black text-white py-3 px-8  hover:bg-gray-800 transition duration-300 ease-in-out">
        PROCEED TO PAYMENT
      </button>
    </div>
  </div>
</div>



    
    
    </div>
  );
};

export default Cart;
