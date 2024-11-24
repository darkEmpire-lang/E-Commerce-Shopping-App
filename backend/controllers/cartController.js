
import userModel from "../models/userModel.js";
// add product to user cart

const addTocart = async (req, res) => {
    try {
        const { userId, ItemId, size } = req.body;

        if (!userId || !ItemId || !size) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const cartData = userData.cartData || {};

        if (cartData[ItemId]) {
            if (cartData[ItemId][size]) {
                cartData[ItemId][size] += 1;
            } else {
                cartData[ItemId][size] = 1;
            }
        } else {
            cartData[ItemId] = { [size]: 1 };
        }

        await userModel.findByIdAndUpdate(userId, { $set: { cartData } }, { new: true });
        res.json({ success: true, message: "Added to Cart", cart: cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


// update user cart

const updateCart= async (req,res)=>{

    try {

        const {userId,ItemId,size,quantity}=req.body

        const userData=await userModel.findById(userId)
        let cartData =await userData.cartData;

        cartData[ItemId][size]=quantity

        
        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:" Cart updated"})
        

        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }

    



}


// get user cart

const getUserCart= async (req,res)=>{

    try {

        
        const {userId}=req.body

        const userData=await userModel.findById(userId)
        let cartData =await userData.cartData;

        res.json({success:true,cartData})


        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
        
    }



}



export{addTocart,updateCart,getUserCart};