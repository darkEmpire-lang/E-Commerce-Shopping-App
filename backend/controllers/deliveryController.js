import Delivery from "../models/delivery.js";
import User from "../models/userModel.js"; // Import User Model


// Assign an Order to a Delivery Officer
export const assignOrder = async (req, res) => {
  try {
    const {
      userId, // User who placed the order
      orderId,
      customerName,
      deliveryOfficer,
      deliveryOfficerEmail,
      estimatedDeliveryDate,
      deliveryNotes,
      deliveryFee,
      trackingNumber,
      comments
    } = req.body;

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new Delivery record
    const newDelivery = new Delivery({
      userId, // Store user ID
      orderId,
      customerName,
      deliveryOfficer,
      deliveryOfficerEmail,
      estimatedDeliveryDate,
      deliveryNotes,
      deliveryFee,
      trackingNumber,
      comments
    });

    await newDelivery.save();
    res.status(201).json({ message: "Order assigned successfully", newDelivery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all assigned orders for a specific user
export const getAssignedOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user existence
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const deliveries = await Delivery.find({ userId }).sort({ assignedAt: -1 });
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all assigned orders (Admin View)
export const getAllAssignedOrders = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate("userId", "name email").sort({ assignedAt: -1 });
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteAssignedOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // Get orderId from request params

    // Find and delete the delivery order
    const deletedOrder = await Delivery.findOneAndDelete({ orderId });

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};