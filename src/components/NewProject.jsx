import { useState } from "react";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaUser,
  FaTag,
  FaDollarSign,
} from "react-icons/fa";
import { TiArrowLeft } from "react-icons/ti";
import { Link } from "react-router-dom";
import Title from "../ui/Title";
import { toast } from "react-toastify";

const NewProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    budget: "",
    category: "",
    startDate: "",
    dateLine: "",
    projectNotes: "",
  });

  console.log(formData);

  const categories = [
    "web-development",
    "app-development",
    "design",
    "marketing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      // Send data to server or perform other actions
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-project`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Handle error response
        throw new Error("Faild to create project");
      }

      const data = await response.json();
      console.log("Server response:", data);
      toast.success(data.success && data.message, {
        position: "bottom-left",
        autoClose: 3000,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className=" mx-4">
      <div className=" flex  justify-start gap-6 items-center mb-6 pt-10 px-6">
        <Link
          to="/"
          className="flex justify-center items-center gap-1 shadow-sm w-20 py-1.5 rounded-lg hover:bg-[var(--hover-bg-color)] duration-300 hover:shadow-md"
        >
          <TiArrowLeft />
          <span className="text-sm"> Back</span>
        </Link>

        <Title text="New Project" des=" Create a new project" />
      </div>

      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
          <h2 className="text-lg font-medium text-gray-800 mb-6">
            Project Information
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaFileAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget ($) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="mm/dd/yyyy"
                      required
                    />
                  </div>
                </div>

                {/* Project Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Notes
                  </label>
                  <textarea
                    name="projectNotes"
                    value={formData.projectNotes}
                    onChange={handleChange}
                    rows="4"
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add any additional notes about the project..."
                  ></textarea>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Client Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter client name"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTag className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="dateLine"
                      value={formData.dateLine}
                      onChange={handleChange}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="mm/dd/yyyy"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none cursor-pointer "
              >
                New Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
