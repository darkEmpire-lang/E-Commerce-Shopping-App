import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Reference User Model
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  customerName: { type: String, required: true },
  deliveryOfficer: { type: String, required: true },
  estimatedDeliveryDate: { type: Date, required: true },
  deliveryNotes: { type: String },
  deliveryFee: { type: Number, required: true },
  trackingNumber: { type: String, required: true, unique: true },
  comments: { type: String },
  assignedAt: { type: Date, default: Date.now }
});

const Delivery = mongoose.model("Delivery", DeliverySchema);
export default Delivery;