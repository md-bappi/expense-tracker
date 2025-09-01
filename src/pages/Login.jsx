import { useContext, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      if (data.success) {
        setUser(data.payload.currentUser);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = () => {
    // you can navigate to reset page or show a modal
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-[var(--body-bg-color)] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-md w-full">
        <h1 className="text-3xl md:text-4xl py-1 font-bold text-center mb-6  bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* Forgot password */}
            <div className="text-left">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-indigo-600 font-medium text-xs hover:underline cursor-pointer"
              >
                Forget password
              </button>
            </div>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="group w-full bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium 
             hover:bg-indigo-700 transition-colors flex items-center justify-center cursor-pointer overflow-hidden"
          >
            Login
            <span className="ml-2 transform transition-transform duration-300 ease-in-out -rotate-[25deg] group-hover:rotate-0 ">
              <FaArrowRight />
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6 pt-6 flex items-center gap-1 text-sm">
          <p>Create an Account?</p>
          <Link
            type="button"
            to="/signup"
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </Link>
        </div>

        {/* Terms */}
        <p className="text-center text-gray-600 text-xs mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="text-indigo-600 font-medium hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600 font-medium hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
