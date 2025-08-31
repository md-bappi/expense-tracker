import { useState } from "react";
import { FaCalendarAlt, FaPaperclip } from "react-icons/fa";
import { TiArrowLeft } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NewExpense = () => {
  const { id } = useParams();
  console.log(id);

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: "08/25/2025",
    notes: "",
    projectId: id,
  });

  const categories = [
    "Materials",
    "Subcontractor",
    "Transport",
    "Equipment",
    "Other",
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
        `http://localhost:4000/api/v1/add-expense/${id}`,
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
        throw new Error("Failed to add expense");
      }
      const data = await response.json();

      console.log(data);
      toast.success(data.success && data.message, {
        position: "bottom-left",
        autoClose: 1000,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
        <div className=" flex items-start gap-6">
          <Link
            to="/projects"
            className="flex justify-center items-center gap-1 shadow-sm w-20 py-1.5 rounded-lg hover:bg-[var(--hover-bg-color)] duration-300 hover:shadow-md"
          >
            <TiArrowLeft />
            <span className="text-sm"> Back</span>
          </Link>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Add Expense
            </h2>
            <p className="text-gray-600 mb-6">Add a new expense</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Expense Details */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Expense Details
          </h3>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter expense description"
              required
            />
          </div>

          {/* Amount and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount ($) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="pl-7 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                required
              >
                <option value="">Select category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any additional details about this expense..."
            ></textarea>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          {/* Receipts/Invoices */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Receipts/Invoices
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <div className="flex justify-center mb-2">
                <FaPaperclip className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-1">Drop files here or browse</p>
              <p className="text-xs text-gray-500">
                Supports: PDF, JPG, PNG, GIF (max 10MB)
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewExpense;
