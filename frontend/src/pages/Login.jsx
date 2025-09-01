import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = "https://edusubmit-backend-y66r.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("adminToken", result.token);
        navigate("/home");
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      {/* Navbar on top */}
      <Navbar />

      {/* Page content */}
      <div className="flex items-center justify-center p-4 pt-10 md:pt-20">
        <div className="w-full max-w-5xl bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* Left Info Panel */}
          <div className="md:w-1/2 bg-indigo-600 text-white p-8 md:p-10 flex flex-col justify-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">Welcome to Admin Panel</h1>
            <p className="text-sm md:text-lg">
              Only <span className="font-semibold">authorized admins</span> can
              access this panel. Manage student submissions, monitor registrations, and update content securely.
            </p>
            <p className="flex items-center space-x-2 text-indigo-100 text-sm md:text-base">
              🔒 Secure & Reliable
            </p>
            <p className="flex items-center space-x-2 text-indigo-100 text-sm md:text-base">
              ✅ Easy to use & responsive
            </p>
          </div>

          {/* Right Login Form */}
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-6 md:mb-8">
              Admin Login
            </h2>
            <form onSubmit={handleLogin} className="grid grid-cols-1 gap-4 md:gap-6">

              {/* Email Input */}
              <div className="relative">
                <MdEmail className="absolute left-3 top-3 text-indigo-600" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 px-3 py-2 md:py-3 border border-gray-300 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition placeholder:text-gray-500"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-3 text-indigo-600" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 px-3 py-2 md:py-3 border border-gray-300 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition placeholder:text-gray-500"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-2 md:py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 shadow-md"
              >
                Login
              </button>
            </form>

            {/* Footer Note */}
            <p className="mt-4 md:mt-6 text-center text-gray-600 text-xs md:text-sm">
              Only authorized personnel can access this panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
