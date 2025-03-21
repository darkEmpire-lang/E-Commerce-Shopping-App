import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa"; // Import edit icon

const DeliveryAgentDashboard = ({ deliveryOfficerId }) => {
  const [orders, setOrders] = useState([]);
  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [availableHours, setAvailableHours] = useState("");

  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedIsAvailable, setUpdatedIsAvailable] = useState("");
  const [updatedAvailableHours, setUpdatedAvailableHours] = useState("");

  const [orderStatus, setOrderStatus] = useState({}); // Store order statuses

  useEffect(() => {
    const name = localStorage.getItem("agentName");
    const role = localStorage.getItem("agentRole");
    const email = localStorage.getItem("agentEmail");
    const phone = localStorage.getItem("agentPhone");
    const available = localStorage.getItem("agentisAvailble");
    const hours = localStorage.getItem("agentavailbleHours");

    if (name) setAgentName(name);
    if (role) setAgentRole(role);
    if (email) setAgentEmail(email);
    if (phone) setAgentPhone(phone);
    if (available) setIsAvailable(available);
    if (hours) setAvailableHours(hours);

    setUpdatedName(name || "");
    setUpdatedRole(role || "");
    setUpdatedEmail(email || "");
    setUpdatedPhone(phone || "");
    setUpdatedIsAvailable(available || "");
    setUpdatedAvailableHours(hours || "");

    // Fetch assigned orders
    const fetchAssignedOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/agent/my-orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching assigned orders:", error);
      }
    };

    fetchAssignedOrders();
  }, []);

  // Update Profile Details
  const handleSaveChanges = () => {
    localStorage.setItem("agentName", updatedName);
    localStorage.setItem("agentRole", updatedRole);
    localStorage.setItem("agentEmail", updatedEmail);
    localStorage.setItem("agentPhone", updatedPhone);
    localStorage.setItem("agentisAvailble", updatedIsAvailable);
    localStorage.setItem("agentavailbleHours", updatedAvailableHours);

    setAgentName(updatedName);
    setAgentRole(updatedRole);
    setAgentEmail(updatedEmail);
    setAgentPhone(updatedPhone);
    setIsAvailable(updatedIsAvailable);
    setAvailableHours(updatedAvailableHours);

    setEditMode(false);
  };

  // Delete Profile Details
  const handleDeleteProfile = () => {
    localStorage.removeItem("agentName");
    localStorage.removeItem("agentRole");
    localStorage.removeItem("agentEmail");
    localStorage.removeItem("agentPhone");
    localStorage.removeItem("agentisAvailble");
    localStorage.removeItem("agentavailbleHours");

    setAgentName("");
    setAgentRole("");
    setAgentEmail("");
    setAgentPhone("");
    setIsAvailable("");
    setAvailableHours("");

    setEditMode(false);
  };

  // Update Order Status
  const handleUpdateStatus = (orderId) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: "Processing...",
    }));

    setTimeout(() => {
      const statuses = ["Pending", "Processing", "Complete"];
      let currentStatus = "Pending";
      let statusIndex = statuses.indexOf(currentStatus);

      const interval = setInterval(() => {
        if (statusIndex < statuses.length - 1) {
          statusIndex++;
          currentStatus = statuses[statusIndex];
          setOrderStatus((prevStatus) => ({
            ...prevStatus,
            [orderId]: currentStatus,
          }));
        } else {
          clearInterval(interval);
        }
      }, 90000);
    }, 90000); // Delay before status changes start
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header with Profile Update */}
      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-700">
          Welcome, {agentName} ({agentRole})
          <p className="text-sm text-gray-500">{agentEmail}</p>
          <p className="text-sm text-gray-500">📞 {agentPhone}</p>
          <p className="text-sm text-gray-500">⏳ Available: {isAvailable}</p>
          <p className="text-sm text-gray-500">🕒 Hours: {availableHours}</p>
        </h1>

        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => setEditMode(true)}
        >
          <FaUserEdit />
          Edit Profile
        </button>
      </div>

      {/* Orders Table */}
      <h2 className="text-xl font-semibold mb-4">My Assigned Orders</h2>
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
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border">
                <td className="border p-2">{order.orderId}</td>
                <td className="border p-2">{order.customerName}</td>
                <td className="border p-2">
                  {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
                </td>
                <td className="border p-2">{order.trackingNumber}</td>
                <td className="border p-2 flex items-center gap-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleUpdateStatus(order._id)}
                  >
                    Update Status
                  </button>
                  <span>{orderStatus[order._id] || "N/A"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Profile Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            {[["Name", updatedName, setUpdatedName], ["Email", updatedEmail, setUpdatedEmail], ["Role", updatedRole, setUpdatedRole], ["Phone", updatedPhone, setUpdatedPhone], ["Availability (Yes/No)", updatedIsAvailable, setUpdatedIsAvailable], ["Available Hours", updatedAvailableHours, setUpdatedAvailableHours],].map(([label, value, setter], index) => (
              <div key={index} className="mb-3">
                <label className="block mb-1 text-sm font-medium">{label}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleDeleteProfile}>
                Delete Profile
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAgentDashboard;
