import { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaClock, FaCheckCircle } from "react-icons/fa";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [availableHours, setAvailableHours] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/agent/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const { name, phone, availableHours, isAvailable } = response.data.officer;
        setName(name);
        setPhone(phone);
        setAvailableHours(availableHours);
        setIsAvailable(isAvailable);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:4000/api/agent/profile",
        { name, phone, availableHours, isAvailable },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      localStorage.setItem("agentName", name);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await axios.delete("http://localhost:4000/api/agent/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        localStorage.removeItem("token");
        alert("Account deleted successfully!");
        window.location.href = "/login";
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg px-10 py-12 w-[95%] sm:w-[500px] lg:w-[550px]">
        <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-lg"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-lg"
              type="tel"
              placeholder="Phone"
              required
            />
          </div>

          <div className="relative">
            <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              value={availableHours}
              onChange={(e) => setAvailableHours(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-lg"
              type="text"
              placeholder="Available Hours"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span>Available for Delivery</span>
          </div>

          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800">Update Profile</button>
          <button onClick={handleDelete} type="button" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700">
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
