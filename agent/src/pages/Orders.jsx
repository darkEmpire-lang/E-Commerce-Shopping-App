import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { FaDownload, FaSearch, FaChartPie, FaTrashAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeliveryOfficer, setSelectedDeliveryOfficer] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAssignButtonClick = (order) => {
    setSelectedOrder(order); // Store selected order
    setIsModalOpen(true);
  };

  // Close modal

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDeliveryOfficer("");
    setEstimatedDeliveryDate("");
    setDeliveryNotes("");
    setSelectedOrder(null);
  };

  const assignOrder = () => {
    if (!selectedOrder) {
      console.error("No order selected for assignment.");
      return;
    }

    console.log("Order Assigned", {
      orderId: selectedOrder._id,
      deliveryOfficer: selectedDeliveryOfficer,
      estimatedDeliveryDate,
      deliveryNotes,
    });

    closeModal();
  };

  const DeliveryModal = ({ order, isModalOpen, closeModal }) => {
    const navigate = useNavigate();

    // States for input fields
    const [selectedDeliveryOfficer, setSelectedDeliveryOfficer] = useState("");
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [deliveryFee, setDeliveryFee] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [comments, setComments] = useState("");
    const [deliveryOfficers, setDeliveryOfficers] = useState([]);

    useEffect(() => {
      if (isModalOpen) {
        axios
          .get("http://localhost:4000/api/agent") // Change API endpoint if necessary
          .then((response) => {
            setDeliveryOfficers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching delivery officers:", error);
          });

        // Generate a tracking number
        setTrackingNumber(`TRK-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    }, [isModalOpen]);

    // Generate a random tracking number when the modal opens
    useEffect(() => {
      if (isModalOpen) {
        setTrackingNumber(`TRK-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    }, [isModalOpen]);

    // Assign order function
    const assignOrder = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/delivery/assign",
          {
            userId: order.userId,
            orderId: order._id,
            customerName: `${order.address.firstName} ${order.address.lastName}`,
            deliveryOfficer: selectedDeliveryOfficer,
            estimatedDeliveryDate,
            deliveryNotes,
            deliveryFee,
            trackingNumber,
            comments,
          }
        );

        if (response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Order assigned successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            closeModal();
            navigate("/delivery"); // Redirect to assigned orders page
          });
        }
      } catch (error) {
        console.error(
          "Error assigning order:",
          error.response?.data || error.message
        );
        Swal.fire({
          title: "Error!",
          text: "Failed to assign order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    return (
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${
          isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white p-6 rounded-md shadow-lg w-[700px] max-h-[600px]">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Assign Order to Delivery Agent
          </h2>

          <p className="font-semibold">Order ID: {order._id}</p>
          <p className="mt-4 font-medium text-gray-800">{`${order.address.firstName} ${order.address.lastName}`}</p>
          <p>{`${order.address.street}, ${order.address.city}`}</p>
          <p>{`${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
          <p>{`Phone: ${order.address.phone}`}</p>
          <p>{`OrderStatus: ${order.status}`}</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label>Select Delivery Officer</label>
              <select
                value={selectedDeliveryOfficer}
                onChange={(e) => setSelectedDeliveryOfficer(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Officer</option>
                {deliveryOfficers.map((officer) => (
                  <option key={officer.id} value={officer.name}>
                    {officer.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">
                Estimated Delivery Date
              </label>
              <input
                type="date"
                className="mt-2 p-2 w-full bg-gray-100 border border-gray-300 rounded-md"
                value={estimatedDeliveryDate}
                onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium">Delivery Notes</label>
              <textarea
                className="mt-2 p-2 w-full bg-gray-100 border border-gray-300 rounded-md"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Additional delivery instructions..."
              ></textarea>
            </div>

            <div>
              <label className="block font-medium">Delivery Fee</label>
              <input
                type="number"
                className="mt-2 p-2 w-full bg-gray-100 border border-gray-300 rounded-md"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                placeholder="Enter delivery fee"
              />
            </div>

            <div>
              <label className="block font-medium">Tracking Number</label>
              <input
                type="text"
                className="mt-2 p-2 w-full bg-gray-100 border border-gray-300 rounded-md"
                value={trackingNumber}
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium">Comments</label>
              <textarea
                className="mt-2 p-2 w-full bg-gray-100 border border-gray-300 rounded-md"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Additional comments for the delivery"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={assignOrder}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Assign Order
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const fetchAllOrders = async () => {
    if (!token) {
      console.log("Token is missing.");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        calculateTotalPrice(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  const calculateTotalPrice = (orders) => {
    const total = orders.reduce((acc, order) => acc + order.amount, 0);
    setTotalPrice(total);
  };

  const downloadReport = () => {
    const doc = new jsPDF();

    // Add Header
    const img = new Image();
    img.src = "/logo3.png"; // Ensure this image is inside the `public` folder

    doc.addImage(img, "PNG", 10, 10, 40, 20);
    doc.setFontSize(18);
    doc.text("Orders Report", 80, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 20);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 150, 27);
    doc.line(10, 35, 200, 35);

    // Report Summary
    doc.setFontSize(14);
    doc.text(`Total Orders: ${orders.length}`, 20, 50);
    doc.text(`Total Revenue: ${currency}${totalPrice.toFixed(2)}`, 20, 60);

    // Orders Table
    const tableData = orders.map((order, index) => [
      index + 1,
      order._id,
      `${order.address.firstName} ${order.address.lastName}`,
      `${currency}${order.amount.toFixed(2)}`,
      order.status,
    ]);

    autoTable(doc, {
      startY: 70,
      head: [["#", "Order ID", "Customer", "Amount", "Status"]],
      body: tableData,
      styles: { fontSize: 10 },
    });

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.line(10, pageHeight - 20, 200, pageHeight - 20);
    doc.setFontSize(10);
    doc.text("Generated by Order Management System", 20, pageHeight - 10);
    doc.text(
      `© ${new Date().getFullYear()} TA FURNITURE STORE`,
      150,
      pageHeight - 10
    );

    doc.save("Orders_Report.pdf");
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
      toast.error(
        error.response?.data?.message || "Error updating order status"
      );
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
      pdf.text(
        "TA FURNITURE STORE - ORDER RECEIPT",
        105,
        12,
        null,
        null,
        "center"
      );

      // Order Details Section
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.text(`Order ID: ${order._id}`, 10, 30);
      pdf.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 10, 40);
      pdf.text(
        `Customer: ${order.address.firstName} ${order.address.lastName}`,
        10,
        50
      );
      pdf.text(
        `Address: ${order.address.street}, ${order.address.city}`,
        10,
        60
      );
      pdf.text(
        `${order.address.state}, ${order.address.country}, ${order.address.zipcode}`,
        10,
        70
      );
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
        pdf.text(
          `${idx + 1}. ${item.name} x ${item.quantity} (${item.size})`,
          12,
          y
        );
        y += 10;
      });

      // Total Amount
      pdf.setFontSize(14);
      pdf.setTextColor(255, 0, 0);
      pdf.text(
        `Total Amount: ${currency}${order.amount.toFixed(2)}`,
        10,
        y + 10
      );

      // Admin Signature Section
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.text("Admin Signature: __________________", 10, y + 30);

      // Footer
      pdf.setFillColor(50, 50, 150);
      pdf.rect(0, 280, 210, 15, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.text(
        "Thank You for Shopping with TA Furniture Store!",
        105,
        288,
        null,
        null,
        "center"
      );

      // Save the PDF
      pdf.save(`Order_Receipt_${orderId}.pdf`);
    } catch (error) {
      console.error("Error generating receipt:", error);
      toast.error("Failed to download receipt.");
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      // Sending the orderId as a URL parameter
      const response = await axios.delete(
        `${backendUrl}/api/order/delete/${orderId}`,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Order deleted successfully");
        fetchAllOrders(); // Refresh orders after deletion
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
      `${order.address.firstName} ${order.address.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const orderStatusCount = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = {
    "Pending": 0,
    "InTransit": 0,
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
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Orders
      </h3>

      {/* Search Bar & Chart Button */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium text-gray-700">
          Total Orders: {orders.length} | Total Revenue:{" "}
          <span className="text-green-600 font-bold">
            {currency}
            {totalPrice.toFixed(2)}
          </span>
        </p>

        <div className="flex gap-4">
          <button
            onClick={downloadReport}
            className="px-4 py-2 bg-green-500 text-white font-bold rounded-md flex items-center"
          >
            <FaDownload className="mr-2" />
            Download Report
          </button>
        </div>
        <div className="flex gap-4">
          {/* <div className="relative w-72">
            <input
              type="text"
              placeholder="Search by Order ID, Name, or Status..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div> */}
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
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
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
              <img
                className="w-16 h-16 object-cover mx-auto sm:mx-0"
                src={assets.parcel_icon}
                alt="Parcel Icon"
              />

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
                  {["order placed",
                    "Pending",
                    "InTransit",
                    "Delivered",
                  ].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>



                

              




                {selectedOrder &&
                  isModalOpen &&
                  selectedOrder._id === order._id && (
                    <DeliveryModal
                      order={selectedOrder} // Pass the selected order to the modal
                      isModalOpen={isModalOpen}
                      closeModal={() => setIsModalOpen(false)} // Close the modal
                      assignOrder={assignOrder}
                    />
                  )}

                {/* Modal Component */}
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
