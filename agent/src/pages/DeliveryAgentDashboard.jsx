import { useEffect, useState } from "react";
import axios from "axios";

const DeliveryAgentDashboard = ({ deliveryOfficerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAssignedOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/delivery/assigned-orders/${deliveryOfficerId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching assigned orders:", error);
      }
    };

    fetchAssignedOrders();
  }, [deliveryOfficerId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Assigned Orders</h1>
      {orders.length === 0 ? (
        <p>No assigned orders.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Estimated Delivery</th>
              <th className="border p-2">Tracking Number</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border">
                <td className="border p-2">{order.orderId}</td>
                <td className="border p-2">{order.customerName}</td>
                <td className="border p-2">{new Date(order.estimatedDeliveryDate).toLocaleDateString()}</td>
                <td className="border p-2">{order.trackingNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeliveryAgentDashboard;
