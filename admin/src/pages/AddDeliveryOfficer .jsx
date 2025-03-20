import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// You should define the backend URL here
const backendUrl = 'http://localhost:4000'; // Replace with actual backend URL

const AddDeliveryOfficer = ({ token }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [role, setRole] = useState("Junior");
  const [availableHours, setAvailableHours] = useState([]);

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/agent/create`,
        {
          name,
          email,
          phone,
          isAvailable,
          role,
          availableHours
        },
        { headers: { token } }
      );

      console.log(response.data);
      if (response.data.message === "Delivery Officer created successfully!") {
        toast.success("Delivery Officer added successfully!");
      } else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Delivery Officer Already Exist Use A Diffrent Email ");
    }
  };

  const handleAvailableHoursChange = (hour) => {
    setAvailableHours((prevHours) =>
      prevHours.includes(hour)
        ? prevHours.filter((h) => h !== hour) // Remove hour if already selected
        : [...prevHours, hour] // Add hour if not selected
    );
  };

  return (
    <form onSubmit={onsubmitHandler} className="flex flex-col w-full items-start gap-3">
      {/* Name */}
      <div className="w-1/2">
        <p className="mb-2 text-gray-600 font-medium">Name</p>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="w-1/2">
        <p className="mb-2 text-gray-600 font-medium">Email</p>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Phone */}
      <div className="w-1/2">
        <p className="mb-2 text-gray-600 font-medium">Phone</p>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      {/* Availability */}
      <div className="w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAvailable"
            checked={isAvailable}
            onChange={() => setIsAvailable((prev) => !prev)}
            className="mr-2"
          />
          <label htmlFor="isAvailable" className="text-gray-600">
            Available for delivery
          </label>
        </div>
      </div>

      {/* Role */}
      <div className="w-full">
        <p className="mb-2 text-gray-600 font-medium">Role</p>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Junior">Junior Delivery Officer</option>
          <option value="Senior">Senior Delivery Officer</option>
        </select>
      </div>

      {/* Available Hours */}
      <div className="w-full">
        <p className="mb-2 text-gray-600 font-medium">Available Hours</p>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="3hours"
              checked={availableHours.includes(3)}
              onChange={() => handleAvailableHoursChange(3)}
              className="mr-2"
            />
            <label htmlFor="3hours" className="text-gray-600">3 Hours</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="5hours"
              checked={availableHours.includes(5)}
              onChange={() => handleAvailableHoursChange(5)}
              className="mr-2"
            />
            <label htmlFor="5hours" className="text-gray-600">5 Hours</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="8hours"
              checked={availableHours.includes(8)}
              onChange={() => handleAvailableHoursChange(8)}
              className="mr-2"
            />
            <label htmlFor="8hours" className="text-gray-600">8 Hours</label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-1/2">
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-all"
        >
          Add Delivery Officer
        </button>
      </div>
    </form>
  );
};

export default AddDeliveryOfficer;
