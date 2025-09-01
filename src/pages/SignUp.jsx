import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const SignUp = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
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
      console.log(data);

      if (data.success) {
        setUser(data.payload.userPayload);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--body-bg-color)] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 py-1  bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Sign UP
        </h1>

        <form onSubmit={handleSubmit} className=" mt-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full  px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm"
                placeholder="Md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full  px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm"
                placeholder="Anis"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full  px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm "
              placeholder="anis@gmail.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company (Optional)
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full  px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm"
              placeholder="Company name"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full  px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm"
              placeholder="Create a password "
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="mb-8 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full  px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="group w-full bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center cursor-pointer overflow-hidden"
          >
            Sign Up
            <span className="ml-2 transform transition-transform duration-300 ease-in-out -rotate-[25deg] group-hover:rotate-0 ">
              <FaArrowRight />
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6 pt-6 flex items-center gap-1 text-sm">
          <p>Already have an Account?</p>
          <Link
            type="button"
            to="/login"
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Login
          </Link>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-600 font-medium">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 font-medium">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
