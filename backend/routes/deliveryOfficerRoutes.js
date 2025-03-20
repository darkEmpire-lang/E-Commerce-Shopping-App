import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import DeliveryOfficer from '../models/deliveryofficer.js';
import agentAuth from '../middleware/agentAuth.js';
import { getOfficers, updateOfficer, deleteOfficer,getAssignedOrdersForOfficer, getOfficerProfile} from '../controllers/deliveryOfficerController.js';
dotenv.config();

const router = express.Router();

// 🔐 Agent Login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if agent exists
      const agent = await DeliveryOfficer.findOne({ email });
      if (!agent) return res.status(400).json({ success: false, message: 'Invalid email or password!' });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, agent.password);
      if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password!' });
  
      // Generate JWT Token
      const token = jwt.sign({ id: agent._id, email: agent.email, role: agent.role }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Set expiration time as required
      });
  
      res.json({ success: true, token, agent: { id: agent._id, name: agent.name, email: agent.email, role: agent.role } });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error!', error: error.message });
    }
  });
  


  // 📝 Register a New Delivery Agent
router.post('/register', async (req, res) => {
    try {
      const { name, email, phone, password, isAvailable, role, availableHours } = req.body;
  
      // Check if the agent already exists
      let agent = await DeliveryOfficer.findOne({ email });
      if (agent) return res.status(400).json({ success: false, message: 'Agent already exists!' });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new agent
      agent = new DeliveryOfficer({
        name,
        email,
        phone,
        password: hashedPassword,
        isAvailable,
        role,
        availableHours,
      });
  
      await agent.save();
  
      // Automatically log in the agent after successful registration and issue a token
      const token = jwt.sign({ id: agent._id, email: agent.email, role: agent.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(201).json({ success: true, message: 'Agent registered successfully!', token, agent: { name: agent.name, email: agent.email, role: agent.role } });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error!', error: error.message });
    }
  });
  

// 🔐 Get Logged-in Agent Profile
router.get('/profile', agentAuth, async (req, res) => {
  try {
    const agent = await DeliveryOfficer.findById(req.agent.id).select('-password');
    res.json({ success: true, agent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error!', error: error.message });
  }
});

// 📝 Get all delivery officers
router.get('/', getOfficers);

// ✏️ Update a delivery officer
router.put('/:id', updateOfficer);

// 🗑️ Delete a delivery officer
router.delete('/:id', deleteOfficer);

router.get('/profile', agentAuth, getOfficerProfile);

// Update Delivery Officer Profile

// Delete Delivery Officer Account


router.get("/my-orders", agentAuth, getAssignedOrdersForOfficer);




export default router;
