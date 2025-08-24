import { useState } from "react";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";

const Option = ({ options }) => {
  // 👇 Start with first option instead of empty
  const [selected, setSelected] = useState(options[0]?.value || "");
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false); // close after selecting
  };

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full p-2 rounded-lg text-sm bg-[var(--hover-bg-color)] text-gray-700 shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50 hover:border-[var(--border-color)] focus:outline-none transition-all duration-200"
      >
        <span className="mx-2 truncate text-gray-700">
          {options.find((o) => o.value === selected)?.label}
        </span>
        <MdKeyboardArrowDown
          size={20}
          className={`text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left rounded-md 
                          hover:bg-gray-100 cursor-pointer transition-colors ${
                            selected === option.value
                              ? "bg-gray-50 font-medium"
                              : ""
                          }`}
            >
              {option.label}
              {selected === option.value && (
                <MdCheck className="text-indigo-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Option;
