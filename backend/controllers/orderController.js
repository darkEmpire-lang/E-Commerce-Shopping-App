
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";
import Stripe from 'stripe'


//global varaibles

const currency ='usd'
const deliveryCharge=10

//gateway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// const razorpayInstance = new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET})


//placing order uisng cod method

const placeOrder=async (req,res)=>{


    try {

        const {userId,items,amount,address}=req.body;

        const orderData={

            userId,
            items,
            amount,
            address,
            paymentMethod:"cod",
            payment:false,
            date:Date.now()
        }

        const newOrder=new orderModel(orderData)

        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Pending"})



        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }


}


//placing order uisng stripe method

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Map items to line_items
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100) // Ensure it's an integer
            },
            quantity: item.quantity
        }));

        // Add delivery charge to line_items
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100 // Use deliveryCharge directly
            },
            quantity: 1
        });

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        });

        res.json({ success: true, session_url: session.url }); // Use session.url
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// verify stripe

const verifyStripe = async(req,res)=>{

    const{orderId,success,userId}=req.body

    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true});
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
        
    }
}




//placing order uisng razorpay method

const placeOrderRazorpay=async (req,res)=>{

    // try {

    //     const { userId, items, amount, address } = req.body;
        

    //     const orderData = {
    //         userId,
    //         items,
    //         amount,
    //         address,
    //         paymentMethod: "Razorpay",
    //         payment: false,
    //         date: Date.now()
    //     };


        
    //     const newOrder = new orderModel(orderData);
    //     await newOrder.save();


    //     const options = {

    //         amount:amount *100,
    //         currency:currency.toUpperCase(),
    //         receipt : newOrder._id.toString()
    //     }

    //     await razorpayInstance.orders.create(options,(error,order)=>{

    //         if(error){
    //             console.log(error)
    //             return res.json({success:false,message:error})
    //         }

    //         res.json({success:true,order})



    //     })
        






        
    // } catch (error) {

        
    //     console.log(error)
    //     res.json({success:false,message:error.message})
        
        
    // }




    
}


// all orders for admin panel


const allOrders=async (req,res)=>{

    try {

        const orders = await orderModel.find({})
        res.json({success:true,orders})



        
    } catch (error) {

        
        console.log(error)
        res.json({success:false,message:error.message})
        
    }



    
}


// user orders for admin panel


const userOrders=async (req,res)=>{


    try {

        const {userId}=req.body
        const orders=await orderModel.find({userId})
        res.json({success:true,orders})
        
    } catch (error) {

        
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

    
}


// update order status  from admin panel
const updateStatus=async (req,res)=>{

    try {
        const {orderId,status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"status Updated"})
        
    } catch (error) {

        
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

    
}
const deleteOrder = async (req, res) => {
    const { orderId } = req.body;
  
    try {
      const order = await Order.findById(orderId);  // Find the order by ID
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      // Proceed with deleting the order
      await Order.findByIdAndDelete(orderId);
  
      return res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      return res.status(500).json({ success: false, message: "Failed to delete the order" });
    }
  };
  




export {placeOrder,placeOrderStripe,updateStatus,allOrders,userOrders,verifyStripe,deleteOrder}






