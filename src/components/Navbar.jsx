import { useContext, useState, useEffect, useRef } from "react";
import { FiSidebar } from "react-icons/fi";
import Sidebar from "./Sidebar";
import { AuthContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const { user, setUser } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Profile initials
  const profile = () => {
    const firstLetter = user?.firstName?.[0] || "";
    const lastLetter = user?.lastName?.[0] || "";
    return firstLetter + lastLetter || "MD";
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    if (showProfileMenu) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showProfileMenu]);

  // Logout handler
  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative bg-[var(--bg-primary-color)]">
      {/* Top Navbar */}
      <div className="navbar flex justify-between md:justify-end items-center px-4 py-2 shadow">
        {/* Sidebar Toggle */}
        <span
          onClick={() => setShowSidebar((prev) => !prev)}
          className="md:hidden cursor-pointer text-xl"
        >
          <FiSidebar />
        </span>

        {/* Profile Menu */}
        <div className="relative" ref={menuRef}>
          <div
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="w-8 h-8 rounded-full bg-[var(--hover-bg-color)] flex justify-center items-center cursor-pointer"
          >
            <h2 className="uppercase text-xs">{profile()}</h2>
          </div>

          {/* Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border border-gray-200 z-50">
              <ul className="flex flex-col py-2">
                <Link
                  to="/settings"
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900 transition-opacity duration-300 ease-in-out z-40 
        ${showSidebar ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => setShowSidebar(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out 
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar isMobileSidebar={true} />
      </div>
    </div>
  );
};

export default Navbar;
