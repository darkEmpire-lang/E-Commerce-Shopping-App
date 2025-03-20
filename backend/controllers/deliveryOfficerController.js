import DeliveryOfficer from '../models/deliveryofficer.js';

// Create a new delivery officer
// export const createOfficer = async (req, res) => {
//   try {
//     const { name, email, phone, isAvailable, role, availableHours } = req.body;
//     const newOfficer = new DeliveryOfficer({ 
//       name, 
//       email, 
//       phone, 
//       isAvailable, 
//       role, 
//       availableHours 
//     });

//     await newOfficer.save();
//     res.status(201).json({ message: 'Delivery Officer created successfully!', officer: newOfficer });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating delivery officer', error: error.message });
//   }
// };

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
