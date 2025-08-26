import { useState } from "react";

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password validation logic here
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    alert("Password updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mx-6">
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 ">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i className="ri-shield-keyhole-line mr-2 text-blue-600"></i>
          Security
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <i className="ri-lock-password-line mr-2 text-gray-500"></i>
              Current Password
            </h2>
            <div className="relative">
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <i className="ri-key-2-line absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <i className="ri-key-line mr-2 text-gray-500"></i>
              New Password
            </h2>
            <div className="relative">
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <i className="ri-lock-password-line absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <i className="ri-check-double-line mr-2 text-gray-500"></i>
              Confirm Password
            </h2>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <i className="ri-shield-check-line absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
          >
            <i className="ri-check-line mr-2"></i>
            Update Password
          </button>
        </form>

        {/* Password strength indicator (optional) */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <i className="ri-information-line mr-1 text-blue-500"></i>
            Password Requirements
          </h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-center">
              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i> At
              least 8 characters
            </li>
            <li className="flex items-center">
              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i>{" "}
              One uppercase letter
            </li>
            <li className="flex items-center">
              <i className="ri-checkbox-circle-line text-green-500 mr-1"></i>{" "}
              One number or special character
            </li>
          </ul>
        </div>
      </div>

      {/* Add Remix Icon CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
        rel="stylesheet"
      ></link>
    </div>
  );
};

export default SecuritySettings;
