import React, { useEffect, useRef, useState } from "react";

const AddContent = () => {
  const nameRef = useRef();
  const collegeRef = useRef();
  const domainRef = useRef();
  const degreeRef = useRef();
  const ageRef = useRef();
  const numberRef = useRef();

  const [studentData, setStudentData] = useState([]);

  const API_URL = "https://edusubmit-backend-y66r.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const collegeName = collegeRef.current.value.trim();
    const domain = domainRef.current.value.trim();
    const degree = degreeRef.current.value.trim();
    const age = ageRef.current.value.trim();
    const number = numberRef.current.value.trim();

    if (!name || !collegeName || !domain || !degree || !age || !number) {
      alert("Please fill all fields!");
      return;
    }

    const addStudent = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            collegeName,
            domain,
            degree,
            age,
            number,
          }),
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const newData = await response.json();
        setStudentData([...studentData, newData]);

        // Clear inputs
        nameRef.current.value = "";
        collegeRef.current.value = "";
        domainRef.current.value = "";
        degreeRef.current.value = "";
        ageRef.current.value = "";
        numberRef.current.value = "";
        alert("Details stored successfully!");
      } catch (error) {
        console.error("Error while saving data:", error);
      }
    };

    addStudent();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Info Panel */}
        <div className="md:w-1/2 bg-indigo-600 text-white p-8 md:p-10 flex flex-col justify-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">Add New Student</h1>
          <p className="text-sm md:text-lg">
            Fill out the form to register a new student. The information will be
            securely stored in the database and visible to authorized admins.
          </p>
          <p className="flex items-center space-x-2 text-indigo-100 text-sm md:text-base">
            ✅ Easy to use & responsive form
          </p>
          <p className="flex items-center space-x-2 text-indigo-100 text-sm md:text-base">
            🔒 Secure student information
          </p>
        </div>

        {/* Right Form Panel */}
        <div className="md:w-1/2 p-6 md:p-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {[
              {
                label: "Name",
                ref: nameRef,
                type: "text",
                placeholder: "Enter your name",
              },
              {
                label: "College Name",
                ref: collegeRef,
                type: "text",
                placeholder: "Enter your college name",
              },
              {
                label: "Domain",
                ref: domainRef,
                type: "text",
                placeholder: "Enter your domain",
              },
              {
                label: "Degree",
                ref: degreeRef,
                type: "text",
                placeholder: "Enter your degree",
              },
              {
                label: "Age",
                ref: ageRef,
                type: "number",
                placeholder: "Enter your age",
              },
              {
                label: "Number",
                ref: numberRef,
                type: "text",
                placeholder: "Enter your number",
              },
            ].map((field, idx) => (
              <div className="flex flex-col" key={idx}>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  ref={field.ref}
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white/70 backdrop-blur-sm"
                />
              </div>
            ))}

            {/* Submit Button */}
            <div className="sm:col-span-2 mt-2">
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
