import { useEffect } from "react";
import { useState } from "react";
import {
  RiShieldKeyholeLine,
  RiLockPasswordLine,
  RiKey2Line,
  RiKeyLine,
  RiCheckDoubleLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCheckLine,
} from "react-icons/ri";

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/update-password`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Password update failed");
      }

      alert("Password updated successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mx-6">
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <RiShieldKeyholeLine className="mr-2 text-blue-600" />
          Security
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <RiLockPasswordLine className="mr-2 text-gray-500" />
              Current Password
            </h2>
            <div className="relative">
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm"
                required
              />
              <RiKey2Line className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* New Password */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <RiKeyLine className="mr-2 text-gray-500" />
              New Password
            </h2>
            <div className="relative">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm"
                required
              />
              {showPassword.newPassword ? (
                <RiEyeLine
                  onClick={() => togglePassword("newPassword")}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                />
              ) : (
                <RiEyeOffLine
                  onClick={() => togglePassword("newPassword")}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                />
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <RiCheckDoubleLine className="mr-2 text-gray-500" />
              Confirm Password
            </h2>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-indigo-300 rounded-xl shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 text-gray-700 placeholder:text-sm"
                required
              />
              {showPassword.confirmPassword ? (
                <RiEyeLine
                  onClick={() => togglePassword("confirmPassword")}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                />
              ) : (
                <RiEyeOffLine
                  onClick={() => togglePassword("confirmPassword")}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                />
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center cursor-pointer"
          >
            <RiCheckLine className="mr-2" />
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecuritySettings;
