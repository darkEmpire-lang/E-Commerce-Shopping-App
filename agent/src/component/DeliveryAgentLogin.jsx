import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

const backendUrl = "http://localhost:4000"; // Update with actual backend URL

const DeliveryAgentLogin = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Junior");
  const [availableHours, setAvailableHours] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true); // Added isAvailable field
  const navigate = useNavigate();

  const toggleAuthMode = () => setIsLogin(!isLogin);

  // Handle available hours selection
  const handleHourChange = (hour) => {
    setAvailableHours((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/agent/login`, {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);

        localStorage.setItem("agentId", response.data.agent.id);

        toast.success("Login Successful");
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error logging in.");
    }
  };

  const onSignupHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || availableHours.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/agent/register`, {
        name,
        email,
        phone,
        password, // Added password for signup
        isAvailable, // Now sending isAvailable field
        role,
        availableHours,
      });

      if (response.data.success) {
        toast.success("Signup Successful!");
        localStorage.setItem("agentName", name);
        localStorage.setItem("agentEmail", email);
        localStorage.setItem("agentPhone", phone);
        localStorage.setItem("agentRole", role);
        localStorage.setItem("agentisAvailble", isAvailable);
        localStorage.setItem("agentavailbleHours", availableHours);

        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Delivery Officer Already Exists. Use a Different Email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="relative bg-white text-black shadow-lg rounded-lg px-10 py-12 w-[95%] sm:w-[500px] lg:w-[550px]">
        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={onLoginHandler} className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Login</h2>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-10 py-3 border border-gray-300 rounded-lg"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-10 py-3 border border-gray-300 rounded-lg"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex justify-between text-sm mt-2">
              <p className="cursor-pointer">Forgot your password?</p>
              <p
                onClick={toggleAuthMode}
                className="cursor-pointer text-blue-600"
              >
                Create account
              </p>
            </div>

            <button className="bg-black text-white px-8 py-3 rounded-lg mt-4 hover:bg-gray-800">
              Sign In
            </button>
          </form>
        ) : (
          /* Signup Form */
          <form onSubmit={onSignupHandler} className="flex flex-col gap-6">
            <div className="flex items-center">
              {/* Back Icon */}
              <FaArrowLeft
                className="text-gray-500 text-2xl cursor-pointer hover:text-black"
                onClick={toggleAuthMode}
              />
              <h2 className="text-2xl font-semibold text-center flex-grow">
                Delivery Agent Sign Up
              </h2>
            </div>

            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  // Validate: Name should start with a letter
                  if (value === "" || /^[A-Za-z]/.test(value)) {
                    setName(value);
                  }
                }}
                value={name}
                className="w-full px-10 py-3 border border-gray-300 rounded-lg"
                type="text"
                placeholder="Full Name"
                required
              />
              {name.length > 0 && !/^[A-Za-z]/.test(name) && (
                <p className="text-red-500 text-sm mt-1">
                  Name must start with a letter
                </p>
              )}
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-10 py-3 border border-gray-300 rounded-lg"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  // Validate: Allow only digits and ensure max length of 10
                  if (/^\d{0,10}$/.test(value)) {
                    setPhone(value);
                  }
                }}
                value={phone}
                className="w-full px-10 py-3 border border-gray-300 rounded-lg"
                type="tel"
                placeholder="Phone"
                required
              />
              {phone.length > 0 && phone.length < 10 && (
                <p className="text-red-500 text-sm mt-1">
                  Phone number must be 10 digits
                </p>
              )}
            </div>

            {/* Password Field for Signup */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-10 py-3 border border-gray-300 rounded-lg"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={() => setIsAvailable(!isAvailable)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span>Available for Delivery</span>
            </div>

            {/* Available Hours */}
            <div>
              <p className="mb-2 text-gray-600 font-medium">Available Hours</p>
              <div className="grid grid-cols-3 gap-4">
                {[3, 5, 8].map((hour) => (
                  <label key={hour} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={availableHours.includes(hour)}
                      onChange={() => handleHourChange(hour)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    {hour} Hours
                  </label>
                ))}
              </div>
            </div>

            {/* Role Selection */}
            <div>
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

            <button className="bg-black text-white px-8 py-3 rounded-lg mt-4 hover:bg-gray-800">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DeliveryAgentLogin;
