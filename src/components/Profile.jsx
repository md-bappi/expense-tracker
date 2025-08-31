import { useState } from "react";
import { FaUser, FaEnvelope, FaBuilding } from "react-icons/fa";

import { useContext } from "react";
import { AuthContext } from "../App";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    company: user.companyName,
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved profile:", profile);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
        <FaUser />
        <span>Profile Information</span>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-gray-600 ">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="w-full  px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className="w-full  px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-sm mt-1"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Company</label>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="company"
              value={profile.companyName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-sm mt-1"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end ">
        <button
          onClick={handleSave}
          className=" bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl focus:outline-none transition duration-200 flex items-center justify-center cursor-pointer"
        >
          <span className=" pr-2">
            <FaUser />
          </span>{" "}
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
