import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeliveryOfficerPage = ({ token }) => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    fetchOfficers();
  }, []);

  // Fetch delivery officers from backend
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

  // Delete officer
  const handleDeleteOfficer = async (id) => {
    if (window.confirm("Are you sure you want to delete this delivery officer?")) {
      try {
        await axios.delete(`${backendUrl}/api/agent/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Officer deleted successfully!");
        fetchOfficers(); // Refresh list
      } catch (error) {
        console.error(error);
        toast.error("Error deleting officer.");
      }
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
              <td className="p-3 text-center">
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
    </div>
  );
};

export default DeliveryOfficerPage;
