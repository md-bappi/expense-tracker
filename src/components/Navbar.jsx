import { FiSidebar } from "react-icons/fi";
import Sidebar from "./Sidebar";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className="relative bg-[var(--bg-primary-color)]">
      {/* Top Navbar */}
      <div className="navbar flex justify-between md:justify-end items-center px-4 py-2 shadow">
        <span
          onClick={() => setShowSidebar((prev) => !prev)}
          className="md:hidden cursor-pointer text-xl"
        >
          <FiSidebar />
        </span>

        <div className="w-7 h-7 rounded-full bg-[var(--hover-bg-color)] flex justify-center items-center cursor-pointer">
          <h2 className="uppercase text-xs">mb</h2>
        </div>
      </div>

      {/* Overlay (fade in/out) */}
      <div
        className={`fixed inset-0 bg-gray-900 transition-opacity duration-300 ease-in-out z-40 
        ${showSidebar ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => setShowSidebar(false)}
      ></div>

      {/* Sidebar (slide in/out) */}
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
