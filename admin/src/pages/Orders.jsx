import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { FaDownload, FaSearch, FaChartPie, FaTrashAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChart, setShowChart] = useState(false);

  const fetchAllOrders = async () => {
    if (!token) {
      console.log("Token is missing.");
      return;
    }

    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating order status");
    }
  };

  const downloadReceipt = async (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    if (!order) return;

    try {
      const pdf = new jsPDF("p", "mm", "a4");

      // Header
      pdf.setFillColor(50, 50, 150);
      pdf.rect(0, 0, 210, 20, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.text("TA FURNITURE STORE - ORDER RECEIPT", 105, 12, null, null, "center");

      // Order Details Section
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.text(`Order ID: ${order._id}`, 10, 30);
      pdf.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 10, 40);
      pdf.text(`Customer: ${order.address.firstName} ${order.address.lastName}`, 10, 50);
      pdf.text(`Address: ${order.address.street}, ${order.address.city}`, 10, 60);
      pdf.text(`${order.address.state}, ${order.address.country}, ${order.address.zipcode}`, 10, 70);
      pdf.text(`Phone: ${order.address.phone}`, 10, 80);
      pdf.text(`Payment Method: ${order.paymentMethod}`, 10, 90);

      // Items Section
      pdf.setFillColor(230, 230, 230);
      pdf.rect(10, 100, 190, 8, "F");
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.text("Items Ordered:", 12, 106);

      let y = 115;
      order.items.forEach((item, idx) => {
        pdf.text(`${idx + 1}. ${item.name} x ${item.quantity} (${item.size})`, 12, y);
        y += 10;
      });

      // Total Amount
      pdf.setFontSize(14);
      pdf.setTextColor(255, 0, 0);
      pdf.text(`Total Amount: ${currency}${order.amount.toFixed(2)}`, 10, y + 10);

      // Admin Signature Section
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.text("Admin Signature: __________________", 10, y + 30);

      // Footer
      pdf.setFillColor(50, 50, 150);
      pdf.rect(0, 280, 210, 15, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.text("Thank You for Shopping with TA Furniture Store!", 105, 288, null, null, "center");

      // Save the PDF
      pdf.save(`Order_Receipt_${orderId}.pdf`);
    } catch (error) {
      console.error("Error generating receipt:", error);
      toast.error("Failed to download receipt.");
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      // Sending the orderId as a URL parameter
      const response = await axios.delete(`${backendUrl}/api/order/delete/${orderId}`, {
        headers: { token },
      });
  
      if (response.data.success) {
        toast.success("Order deleted successfully");
        fetchAllOrders();  // Refresh orders after deletion
      } else {
        toast.error(response.data.message || "Failed to delete the order.");
      }
    } catch (error) {
      toast.error("Failed to delete the order.");
      console.error("Error deleting order:", error);
    }
  };
  

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const filteredOrders = orders.filter(
    (order) =>
      order._id.includes(searchQuery) ||
      `${order.address.firstName} ${order.address.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const orderStatusCount = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = {
    "Order Placed": 0,
    Packing: 0,
    Shipping: 0,
    "Out for delivery": 0,
    Delivered: 0,
  };

  orders.forEach((order) => {
    if (statusCounts.hasOwnProperty(order.status)) {
      statusCounts[order.status]++;
    }
  });

  const chartData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Orders</h3>

      {/* Search Bar & Chart Button */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium text-gray-700">Total Orders: {orders.length}</p>
        <div className="flex gap-4">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search by Order ID, Name, or Status..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          <button
            onClick={() => setShowChart(!showChart)}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md flex items-center"
          >
            <FaChartPie className="mr-2" />
            Chart
          </button>
        </div>
      </div>

      {/* Pie Chart Section */}
      {showChart && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-center">
          <PieChart width={400} height={300}>
            <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}

      <div className="grid gap-6">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-300 rounded-lg bg-white shadow-md p-5 hover:shadow-lg transition-shadow"
            >
              <img className="w-16 h-16 object-cover mx-auto sm:mx-0" src={assets.parcel_icon} alt="Parcel Icon" />

              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-gray-700">
                    {item.name} x {item.quantity} ({item.size})
                    {idx !== order.items.length - 1 && <span>,</span>}
                  </p>
                ))}
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="mt-4 font-medium text-gray-800">{`${order.address.firstName} ${order.address.lastName}`}</p>
                <p>{`${order.address.street}, ${order.address.city}`}</p>
                <p>{`${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                <p>{`Phone: ${order.address.phone}`}</p>
                <p className="text-gray-600 mt-2">Status: {order.status}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <select
                  className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded-md"
                  value={order.status}
                  onChange={(event) => statusHandler(event, order._id)}
                >
                  {["Order Placed", "Packing", "Shipping", "Out for delivery", "Delivered"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => downloadReceipt(order._id)}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                  <FaDownload />
                </button>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
