import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { login } from "../services/Api";

const Login = () => {
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const navigate = useNavigate("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login({
        mobile: formData.mobile,
        password: formData.password,
        userType,
      });
  
      // Store the JWT token in localStorage or sessionStorage
      localStorage.setItem("token", response.token);
  
      // Navigate based on user type
      if (userType === "hospital") {
        navigate("/hospitaldashboard");
      } else {
        navigate("/bookappointment");
      }
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <FaUserCircle size={50} className="text-purple-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setUserType("patient")}
            className={`px-4 py-2 text-sm font-medium ${
              userType === "patient" ? "bg-purple-500 text-white" : "bg-gray-200"
            } rounded-l-md`}
          >
            Patient
          </button>
          <button
            onClick={() => setUserType("hospital")}
            className={`px-4 py-2 text-sm font-medium ${
              userType === "hospital" ? "bg-purple-500 text-white" : "bg-gray-200"
            } rounded-r-md`}
          >
            Hospital
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Mobile No.</label>
            <input
              type="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
          >
            Login
          </button>
         <div className="flex justify-center" >
        <p className='pr-2'> Don't have Account? </p> <Link to ="/signup" className="text-blue-500"> Sign Up</Link>
         </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
