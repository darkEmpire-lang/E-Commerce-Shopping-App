import express from "express";
import { assignOrder, getAssignedOrdersByUser, getAllAssignedOrders,deleteAssignedOrder} from "../controllers/deliveryController.js";

const router = express.Router();

router.post("/assign", assignOrder);
router.get("/assigned-orders/:userId", getAssignedOrdersByUser); // Get assigned orders by User
router.get("/all-assigned-orders", getAllAssignedOrders); // Admin View
router.delete("/delivery/:orderId", deleteAssignedOrder);





export default router;
