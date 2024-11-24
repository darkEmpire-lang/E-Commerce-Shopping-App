import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const[size,setSize]=useState('')


  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]); // Default image
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 px-6">
      {/* Product Container */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Images Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Small Thumbnails */}
          <div className="flex lg:flex-col gap-4">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setImage(item)} // Set main image on click
                className={`w-20 h-20 object-cover border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                  image === item ? 'border-blue-500' : 'border-gray-300'
                }`}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-grow">
            <img
              src={image}
              alt="Main Product"
              className="w-full h-auto object-contain rounded-lg shadow-md border"
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1 space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-semibold">{productData.name}</h1>
          {/* Ratings */}
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Star" className="w-5" />
            ))}
            <img src={assets.star_dull_icon} alt="Star Dull" className="w-5" />
            <span className="text-gray-500">(122 Reviews)</span>
          </div>
          {/* Price */}
          <p className="text-4xl font-bold text-black-600">
            {currency}
            {productData.price}
          </p>

        
          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{productData.description}</p>


           <div className='flex flex-col gap-4 my-8'>

            <p> Select Size </p>
            <div className='flex gap-2'>

              {productData.sizes.map((item,index)=>(
               <button
               onClick={() => setSize(item)}
               className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
               key={index}
             >
               {item}
             </button>
             
              ))}
             </div>
            </div>
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD  TO CART
          </button>
          <hr className='mt-8 sm:2-4/5'/>

       <div className=' text-sm text-gray-500 mt-5 flex flex-col gap-1'>

          <p>100 Original product.</p>
          <p> Cash on delivery is available on this product</p>
          <p> Easy return and exchange policy within 7 days</p>

         </div>  
        </div>
      </div>
      <div className='mt-20'>

       <div className='flex'>

        <b className='border px-5 pt-3 text-sm'>Description</b>
        <p className='border px-5 py-3 text-sm'>Reviews(122)</p>


        </div>

        <div className=' flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>


          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, illum debitis. Dolores minima qui eius debitis aliquam atque dolor. Deserunt sed repudiandae at, vero harum ea ipsam unde asperiores veniam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, omnis recusandae consequatur quasi nihil adipisci dolores quo dolor optio iure odit fugiat numquam blanditiis magni perferendis cum suscipit repudiandae eum.</p>
        </div>
        
      </div>

       {/* Display related products */}

       < RelatedProduct category={productData.category}subCategory={productData.subCategory}/>


    </div>  

    
        
        
    



  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
