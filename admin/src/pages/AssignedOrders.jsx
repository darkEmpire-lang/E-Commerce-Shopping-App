import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";  // Import trash icon from react-icons

const AssignedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Fetch assigned orders on component mount
  useEffect(() => {
    const fetchAssignedOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/delivery/all-assigned-orders");
        setOrders(response.data);
        setFilteredOrders(response.data); // Set initial filtered orders to all orders
      } catch (error) {
        console.error("Error fetching assigned orders:", error);
      }
    };

    fetchAssignedOrders();
  }, []);

  // Delete an assigned order by orderId
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/delivery/delivery/${orderId}`);
      if (response.data.message === "Order deleted successfully") {
        // Remove deleted order from state
        setOrders(orders.filter(order => order.orderId !== orderId));
        setFilteredOrders(filteredOrders.filter(order => order.orderId !== orderId)); // Also update filtered orders
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Handle search input and filter orders based on search term
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = orders.filter((order) => {
      const orderIdMatch = order.orderId.toString().toLowerCase().includes(term.toLowerCase());
      const customerNameMatch = order.customerName.toLowerCase().includes(term.toLowerCase());
      const trackingNumberMatch = order.trackingNumber.toLowerCase().includes(term.toLowerCase());
      return orderIdMatch || customerNameMatch || trackingNumberMatch; // Search across multiple fields
    });
    
    setFilteredOrders(filtered);
  };

  // Function to highlight matching text in a string
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">{part}</span>
      ) : part
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Assigned Orders</h1>
      
      {/* Total Count of Orders */}
      <p className="text-gray-600 mb-4">Total Assigned Orders: {filteredOrders.length}</p>

      {/* Search Bar */}
      
      <input
  type="text"
  placeholder="Search Orders..."
  value={searchTerm}
  onChange={handleSearch}
  className="w-1/3 mb-4 px-4 py-2 border border-gray-300 rounded-md"  // Set width to 1/3 of the container
/>

      
      {filteredOrders.length === 0 ? (
        <p>No assigned orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Delivery Officer Name</th>
              <th className="border p-2">Estimated Date</th>
              <th className="border p-2">Tracking Number</th>
              <th className="border p-2">Action</th> {/* Add a column for actions */}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border">
                <td className="border p-2">{highlightText(order.orderId.toString())}</td>
                <td className="border p-2">{highlightText(order.customerName)}</td>
                <td className="border p-2">{highlightText(order.deliveryOfficer)}</td>
                <td className="border p-2">{new Date(order.estimatedDeliveryDate).toLocaleDateString()}</td>
                <td className="border p-2">{highlightText(order.trackingNumber)}</td>
                <td className="border p-2 text-center">
                  {/* Delete icon */}
                  <button
                    onClick={() => handleDeleteOrder(order.orderId)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignedOrders;
