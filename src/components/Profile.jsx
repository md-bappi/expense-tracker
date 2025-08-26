import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { AiOutlineCamera } from "react-icons/ai";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "Md",
    lastName: "Anis",
    email: "anis@company.com",
    phone: "+1 (555) 123-4567",
    company: "Freelance Designer",
    location: "San Francisco, CA",
    bio: "Experienced project manager and freelance designer specializing in web and mobile applications.",
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

      {/* Profile Photo */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
          JD
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition">
          <AiOutlineCamera />
          Change Photo
        </button>
        <p className="text-xs text-gray-400">JPG, PNG or GIF. Max size 2MB.</p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-gray-100 p-2 text-gray-700"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-gray-100 p-2 text-gray-700"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <div className="flex items-center mt-1 bg-gray-100 rounded-md p-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full bg-gray-100 outline-none text-gray-700"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Company</label>
          <div className="flex items-center mt-1 bg-gray-100 rounded-md p-2">
            <FaBuilding className="text-gray-400 mr-2" />
            <input
              type="text"
              name="company"
              value={profile.company}
              onChange={handleChange}
              className="w-full bg-gray-100 outline-none text-gray-700"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <div className="flex items-center mt-1 bg-gray-100 rounded-md p-2">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full bg-gray-100 outline-none text-gray-700"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Location</label>
          <div className="flex items-center mt-1 bg-gray-100 rounded-md p-2">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full bg-gray-100 outline-none text-gray-700"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-600">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-md bg-gray-100 p-2 text-gray-700"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition flex items-center gap-2"
        >
          <FaUser /> Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
