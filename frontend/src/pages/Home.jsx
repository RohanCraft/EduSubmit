import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { MdLogout, MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const API_URL = "https://edusubmit-backend-y66r.onrender.com";

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Unauthorized");

        const result = await response.json();
        setData(result);
      } catch (error) {
        toast.error("Session expired, please login again.");
        console.error("Error fetching data:", error);
        localStorage.removeItem("adminToken");
        navigate("/login");
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      const response = await fetch(`${API_URL}/admin/students/${studentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete student");

      // Remove student from state
      setData((prevData) =>
        prevData.filter((student) => student._id !== studentId)
      );
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        {/* Spacer */}
        <div className="h-10 md:h-10" />

        <div className="flex flex-grow flex-col items-center justify-start p-6">
          <div className="w-full max-w-7xl bg-white/50 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center md:text-left">
                Student Submissions
              </h2>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500/70 text-white px-4 md:px-5 py-2 rounded-xl font-semibold hover:bg-red-500/90 transition transform hover:scale-105"
              >
                <MdLogout size={20} />
                <span>Logout</span>
              </button>
            </div>

            {/* Student Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((student) => (
                <div
                  key={student._id}
                  className="p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border border-gray-200"
                >
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl md:text-2xl">
                      {student.name.charAt(0)}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="text-center space-y-1 md:space-y-2">
                    <p className="text-indigo-700 font-bold text-lg md:text-xl">
                      {student.name}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base">
                      <span className="font-semibold">College:</span>{" "}
                      {student.collegeName}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base">
                      <span className="font-semibold">Domain:</span>{" "}
                      {student.domain}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base">
                      <span className="font-semibold">Degree:</span>{" "}
                      {student.degree}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base">
                      <span className="font-semibold">Age:</span> {student.age}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base">
                      <span className="font-semibold">Phone:</span>{" "}
                      {student.number}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition transform hover:scale-105"
                    >
                      <MdDelete size={18} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Home;
