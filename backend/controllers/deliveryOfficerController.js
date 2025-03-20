import DeliveryOfficer from '../models/deliveryofficer.js';
import asyncHandler from "express-async-handler";
import Delivery from '../models/delivery.js';



// Get all delivery officers
export const getOfficers = async (req, res) => {
  try {
    const officers = await DeliveryOfficer.find();
    res.status(200).json(officers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching delivery officers', error: error.message });
  }
};

// Update a delivery officer
export const updateOfficer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedOfficer = await DeliveryOfficer.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedOfficer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating delivery officer', error: error.message });
  }
};

// Delete a delivery officer
export const deleteOfficer = async (req, res) => {
  try {
    const { id } = req.params;
    await DeliveryOfficer.findByIdAndDelete(id);
    res.status(200).json({ message: 'Delivery Officer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting delivery officer', error: error.message });
  }
};

export const getAssignedOrdersForOfficer = asyncHandler(async (req, res) => {
  try {
    // Ensure the delivery officer is authenticated and get their ID
    const deliveryOfficerId = req.agent._id;

    // Fetch only orders assigned to this officer
    const assignedOrders = await Delivery.find({ deliveryOfficerId }).sort({ assignedAt: -1 });

    if (!assignedOrders || assignedOrders.length === 0) {
      return res.status(404).json({ message: "No orders assigned to you" });
    }

    res.status(200).json(assignedOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







// Delete Officer Account



export const getOfficerProfile = asyncHandler(async (req, res) => {
  try {
    const officerId = req.agent._id;

    const officer = await DeliveryOfficer.findById(officerId).select('-password');

    if (!officer) {
      return res.status(404).json({ success: false, message: 'Officer not found' });
    }

    res.status(200).json({ success: true, officer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error!', error: error.message });
  }
});