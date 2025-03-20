import express from 'express'
import { placeOrder,placeOrderStripe,allOrders,updateStatus,userOrders,verifyStripe,deleteOrder } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import mongoose from 'mongoose'
import Order from '../models/orderModel.js'

const orderRouter=express.Router()

//Admin Features
orderRouter.post('/list',allOrders)
orderRouter.post('/status',updateStatus)




//payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)



// user feature
orderRouter.post('/userorders',authUser,userOrders)


//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

orderRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;  // Get the order ID from the URL parameter
  
    try {
      // Ensure the id is a valid ObjectId before querying the database
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid order ID" });
      }
  
      console.log(`Deleting order with ID: ${id}`);
  
      // Try to find the order by ID
      const order = await Order.findById(id);  
      if (!order) {
        console.log("Order not found");
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      // Delete the order
      await Order.findByIdAndDelete(id);
      console.log("Order deleted successfully");
  
      return res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
      // Log the error for further inspection
      console.error("Error during order deletion:", error);
      return res.status(500).json({ success: false, message: "Failed to delete the order" });
    }
  });
  
  

export default orderRouter