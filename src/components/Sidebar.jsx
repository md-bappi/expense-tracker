import { FiHome } from "react-icons/fi";
import { FaRegFolderClosed } from "react-icons/fa6";
import { FaRegChartBar } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";

const navlinks = [
  { name: "dashboard", icon: <FiHome size={13} />, path: "/" },
  {
    name: "projects",
    icon: <FaRegFolderClosed size={13} />,
    path: "/projects",
  },
  { name: "reports", icon: <FaRegChartBar size={13} />, path: "/reports" },
  { name: "settings", icon: <CiSettings size={13} />, path: "/settings" },
];

const Sidebar = ({ isMobileSidebar }) => {
  return (
    <div
      className={` h-screen  ${
        isMobileSidebar ? " bg-white z-50 px-1" : "pl-2"
      }`}
    >
      <h2 className=" px-4 py-2 font-medium  ">$ Expense Tracker</h2>

      <ul className="flex flex-col gap-1 mt-2">
        {navlinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-1 rounded-md hover:bg-[var(--hover-bg-color)] ${
                isActive ? "bg-[var(--hover-bg-color)] font-medium" : ""
              }`
            }
          >
            <span>{link.icon}</span>
            <h2 className="capitalize text-xs font-[var(--font-poppins)]">
              {link.name}
            </h2>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
