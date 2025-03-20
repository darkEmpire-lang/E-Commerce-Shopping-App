import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeliveryOfficerPage = ({ token }) => {
  const [officers, setOfficers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editOfficer, setEditOfficer] = useState(null);

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/agent`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOfficers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch delivery officers.");
    }
  };

  const openEditModal = (officer) => {
    setEditOfficer(officer);
    setShowModal(true);
  };

  const handleUpdateOfficer = async (e) => {
    e.preventDefault();
    const { name, email, phone, isAvailable, role, availableHours } = e.target;
    try {
      await axios.put(
        `${backendUrl}/api/agent/${editOfficer._id}`,
        {
          name: name.value,
          email: email.value,
          phone: phone.value,
          isAvailable: isAvailable.checked,
          role: role.value,
          availableHours: availableHours.value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Delivery Officer updated successfully!");
      setShowModal(false);
      fetchOfficers();
    } catch (error) {
      console.error(error);
      toast.error("Error updating officer.");
    }
  };

  const handleDeleteOfficer = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/agent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Officer deleted successfully!");
      fetchOfficers();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting officer.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Manage Delivery Officers</h2>

      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Available</th>
            <th className="p-3">Role</th>
            <th className="p-3">Available Hours</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {officers.map((officer) => (
            <tr key={officer._id} className="border-t hover:bg-gray-200">
              <td className="p-3">{officer.name}</td>
              <td className="p-3">{officer.email}</td>
              <td className="p-3">{officer.phone}</td>
              <td className="p-3 text-center">
                {officer.isAvailable ? "✅" : "❌"}
              </td>
              <td className="p-3">{officer.role}</td>
              <td className="p-3">{officer.availableHours}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => openEditModal(officer)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteOfficer(officer._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Delivery Officer</h2>
            <form onSubmit={handleUpdateOfficer} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                defaultValue={editOfficer.name}
                className="border p-2 rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                defaultValue={editOfficer.email}
                className="border p-2 rounded-md"
                required
              />
              <input
                type="text"
                name="phone"
                defaultValue={editOfficer.phone}
                className="border p-2 rounded-md"
                required
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isAvailable"
                  defaultChecked={editOfficer.isAvailable}
                />
                Available
              </label>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  name="role"
                  defaultValue={editOfficer.role}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="Junior">Junior Delivery Officer</option>
                  <option value="Senior">Senior Delivery Officer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Available Hours</label>
                <input
                  type="text"
                  name="availableHours"
                  defaultValue={editOfficer.availableHours}
                  className="border p-2 rounded-md"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOfficerPage;
