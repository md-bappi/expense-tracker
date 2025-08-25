import { RiDownload2Line } from "react-icons/ri";
import Title from "../ui/Title";
import Button from "../ui/Button";
import Option from "../ui/Option";
import Card from "../ui/Card";
import { FiDollarSign } from "react-icons/fi";
import { IoIosReturnRight } from "react-icons/io";
import { FaOldRepublic, FaRegFolderClosed } from "react-icons/fa6";
import { useState } from "react";
import TinyAreaChart from "../ui/TinyAreaChart";
import ProjectBarChart from "../ui/ProjectBarChart";
import ProjectStatusDashboard from "../ui/ProjectStatusDashboard";
import CategoryBreakdown from "../ui/CategoryBreakdown";
import CategoryComparison from "../ui/CategoryComparison";

const timeOptions = [
  { value: "all-time", label: "All Time" },
  { value: "last-30-days", label: "Last 30 Days" },
  { value: "last-3-months", label: "Last 3 Months" },
  { value: "last-6-months", label: "Last 6 Months" },
  { value: "last-year", label: "Last Year" },
];

const cardData = [
  {
    id: 1,
    title: "Total Budget",
    amount: "$5000.00",
    icon: <FiDollarSign />,
    des: "Across all projects",
  },
  {
    id: 2,
    title: "Budget Utilization",
    amount: "78.1%",
    icon: <IoIosReturnRight />,
    des: "$70,000 of $90,000",
  },
  {
    id: 3,
    title: "Total Profit",
    amount: "$52,700",
    icon: <FaRegFolderClosed />,
    des: "42.8% averag margin",
  },
  {
    id: 4,
    title: "Projects",
    amount: "5",
    icon: <FaOldRepublic />,
    des: "Active projects tracked",
  },
];

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    company: "Tech Innovations",
    budget: "$3000.00",
    spant: "$1500.00",
    status: "In Progress",
    data: "2023-10-01",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Project Beta",
    company: "Creative Solutions",
    budget: "$2000.00",
    spant: "$500.00",
    status: "Overdue",
    data: "2023-09-15",
    category: "Mobile Development",
  },
  {
    id: 3,
    title: "Project Gamma",
    company: "Business Corp",
    budget: "$4000.00",
    spant: "$2000.00",
    status: "In Progress",
    data: "2023-11-20",
    category: "Marketing",
  },
  {
    id: 4,
    title: "Project Delta",
    company: "Enterprise Ltd",
    budget: "$2500.00",
    spant: "$1000.00",
    status: "Completed",
    data: "2023-08-30",
    category: "Design",
  },
];

const tradsData = [
  {
    id: 1,
    title: "Total Budget",
    amount: "$5000.00",
    icon: <FiDollarSign />,
    des: "Across all projects",
  },
  {
    id: 2,
    title: "Total Spent",
    amount: "$2000.00",
    icon: <IoIosReturnRight />,
    des: "82.9% of total budget",
  },
  {
    id: 3,
    title: "Active Projects",
    amount: "2",
    icon: <FaRegFolderClosed />,
    des: "Currently in progress",
  },
];

const categories = [
  { name: "Subcontractor", value: 25600, percentage: 39 },
  { name: "Materials", value: 18500, percentage: 28 },
  { name: "Equipment", value: 12300, percentage: 19 },
  { name: "Other", value: 5800, percentage: 9 },
  { name: "Transport", value: 3200, percentage: 5 },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("Budget Analysis");

  // Find the maximum value for scaling
  const maxValue = Math.max(...categories.map((item) => item.value));
  return (
    <div>
      <div className=" mx-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center ">
        <Title
          text="Reports & Analytics"
          des="Comprehensive insights into your project expenses and profitability"
        />

        <div className=" mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-2">
          <Option options={timeOptions} />
          <Button
            text="Export Report"
            icon={<RiDownload2Line />}
            href="/projects"
            style="bg-[var(--btn-bg-color)] text-[var(--btn-text-color)] rounded-lg  px-4 py-2 min-w-40 "
          />
        </div>
      </div>

      {/* budget, utilization, profit, projects */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[var(--bg-primary-color)] md:bg-[var(--body-bg-color)] ">
        {cardData.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>

      {/* Budget Analysis, Expense Trands, Category Breakdown , Profitability Tabs */}
      <div className=" mx-4">
        <div
          className="bg-[var(--body-bg-color)] flex justify-center items-center gap-2 p-2 my-4 rounded-full text-sm 
             md:border md:border-[var(--border-color)] w-full"
        >
          {[
            "Budget Analysis",
            "Expense Trends",
            "Category Breakdown",
            "Profitability",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full capitalize transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-[var(--bg-primary-color)] shadow-md"
                  : "hover:bg-[var(--hover-bg-color)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Details */}
      <>
        {activeTab === "Budget Analysis" && (
          <>
            <ProjectBarChart />
            <ProjectStatusDashboard />
          </>
        )}

        {activeTab === "Expense Trends" && (
          <>
            <TinyAreaChart />
            <div className=" grid grid-cols-1 md:grid-cols-3  gap-4 p-4 bg-[var(--bg-primary-color)] md:bg-[var(--body-bg-color)] ">
              {tradsData.map((card, index) => {
                return <Card key={index} card={card} />;
              })}
            </div>
          </>
        )}

        {activeTab === "Category Breakdown" && (
          <>
            <CategoryBreakdown />

            <CategoryComparison />
          </>
        )}
      </>
    </div>
  );
};

export default Reports;
