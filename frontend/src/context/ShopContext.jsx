import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext=createContext();


const ShopContextProvider =(props) => {


    const currency='$';
    const delivery_fee=10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const [search,setSearch]=useState('');
    const[showSearch,setShowSearch]=useState(false)
    const [cartItems,setcartItems]=useState({});
    const navigate=useNavigate();
    const [token,setToken]=useState('')
    const [products,setProducts]=useState([])


    const addToCart=async(ItemId,size)=>{

        if(!size){

            toast.error('Select Prodcut Size');
            return
        }

        let cartData=structuredClone(cartItems);

        if(cartData[ItemId]){

            if(cartData[ItemId][size]){

                cartData[ItemId][size]+=1;
            }
            else{
                cartData[ItemId][size]=1;
            }
        }
        else{
            cartData[ItemId]={};
            cartData[ItemId][size]=1;
        }

        setcartItems(cartData);


        if(token){

            try {

                await axios.post(backendUrl +'/api/cart/add',{ItemId,size},{headers:{token}})
                
            } catch (error) {

                console.log(error)
                toast.error(error.message)
                
            }
        }



    }
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [productId, sizes]) => {
          const product = products.find((item) => item._id === productId);
          if (!product) return total;
      
          const sizeTotal = Object.entries(sizes).reduce(
            (subTotal, [size, quantity]) => subTotal + product.price * quantity,
            0
          );
      
          return total + sizeTotal;
        }, 0);
      };
      



    const getCartCount = () => {
        let totalCount = 0;


        for(const items in cartItems){
            for(const item in cartItems[items]){

                try {
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];

                    }
                    
                } catch (error) {
                    
                }
            }
           
        }

        return totalCount;
      
    }

    const updateQuantity =async(ItemId,size,quantity)=>{

        let cartData=structuredClone(cartItems);

        cartData[ItemId][size]=quantity;

        setcartItems(cartData);

        if(token){

            try {

                await axios.post(backendUrl +'/api/cart/update',{ItemId,size,quantity},{headers:{token}})
                
            } catch (error) {

                
                console.log(error)
                toast.error(error.message)
                
            }
        }


    }

    const getProductData=async()=>{

        try {

            const response =await axios.get(backendUrl+'/api/product/list')
            
            if(response.data.success){

                setProducts(response.data.products)
            }
            else{

                toast.error(response.data.message)
            }


            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }


    const getUserCart = async (token)=>{

        try {

            
        
        const response =await axios.post(backendUrl +'/api/cart/get',{},{headers:{token}})
        if(response.data.success){
             setcartItems(response.data.cartData)
        }



            
        } catch (error) {

            
            console.log(error)
            toast.error(error.message)
            
            
        }

    }






    useEffect(()=>{

        getProductData()
    },[])



    

    useEffect(()=>{

        if(!token && localStorage.getItem('token')){

            setToken(localStorage.getItem('token'))

            getUserCart(localStorage.getItem('token'))
        }

    },[])

    
    
      

  
    



    const value ={

        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,
        setToken,token,setcartItems


    }

    
    return(
        <ShopContext.Provider value={value}>

            {props.children}

        </ShopContext.Provider>

            
    )
}

export default ShopContextProvider
