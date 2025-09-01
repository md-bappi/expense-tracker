import { RiDownload2Line } from "react-icons/ri";
import Title from "../ui/Title";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { FiDollarSign } from "react-icons/fi";
import { IoIosReturnRight } from "react-icons/io";
import { FaOldRepublic, FaRegFolderClosed } from "react-icons/fa6";
import { useEffect, useState } from "react";
import TinyAreaChart from "../ui/TinyAreaChart";
import ProjectBarChart from "../ui/ProjectBarChart";
import ProjectStatusDashboard from "../ui/ProjectStatusDashboard";
import CategoryBreakdown from "../ui/CategoryBreakdown";
import CategoryComparison from "../ui/CategoryComparison";
import ProfitabilityBarChart from "../ui/ProfitabilityBarChart";
import PerformanceSummery from "../components/PerformanceSummery";
import Loading from "../ui/Loading";

const timeOptions = [
  { value: "all-time", label: "All Time" },
  { value: "last-30-days", label: "Last 30 Days" },
  { value: "last-3-months", label: "Last 3 Months" },
  { value: "last-6-months", label: "Last 6 Months" },
  { value: "last-year", label: "Last Year" },
];

function getTotalBudgetByCategory(projects) {
  if (!projects) return {};
  return projects?.reduce((acc, project) => {
    const category = project.category || "Uncategorized";
    if (!acc[category]) acc[category] = 0;
    acc[category] += Number(project.budget) || 0;
    return acc;
  }, {});
}

function getTotalExpensesByCategory(expenses) {
  if (!expenses) return {};
  return expenses?.reduce((acc, expense) => {
    const category = expense.projectCategory || "Uncategorized"; 
    if (!acc[category]) acc[category] = 0;
    acc[category] += Number(expense.amount) || 0;
    return acc;
  }, {});
}

const Reports = () => {
  const [activeTab, setActiveTab] = useState("Budget Analysis");
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/all-projects`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          setProjects(null);
          return;
        }

        const data = await res.json();
        console.log(data.payload);
        setProjects(data.payload);
      } catch (error) {
        console.error("Error fetching project:", error);
        setProjects(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchExpeses = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/getUserExpenses`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          setExpenses([]);
          return;
        }

        const data = await res.json();

        const expenseList = Array.isArray(data.payload.expenses)
          ? data.payload.expenses
          : data.payload?.expenses || [];
        setExpenses(expenseList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
    fetchExpeses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const totalCategoryBudget = getTotalBudgetByCategory(projects || []);
  const totalCategoryExpenses = getTotalExpensesByCategory(expenses || []);

  console.log(totalCategoryBudget);
  console.log(totalCategoryExpenses);
  // 🔹 Merge budgets & expenses by category
  const allCategories = new Set([
    ...Object.keys(totalCategoryBudget),
    ...Object.keys(totalCategoryExpenses),
  ]);

  const data = Array.from(allCategories).map((category) => ({
    name: category.replace(/-/g, " "), // clean name
    budget: totalCategoryBudget[category] || 0,
    spent: totalCategoryExpenses[category] || 0,
  }));

  const totalBudget = projects
    ?.reduce((acc, project) => acc + project.budget, 0)
    .toFixed(2);

  const totalSpent = expenses
    ?.reduce((acc, expense) => acc + expense.amount, 0)
    .toFixed(2);

  const utilization =
    totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(2) : 0;

  const totalProfit = totalBudget - totalSpent;

  const totalProjects = projects?.length;

  const averageProfitMargin =
    totalBudget > 0 ? ((totalProfit / totalBudget) * 100).toFixed(2) : 0;

  // group by month
  const monthlyData = expenses.reduce((acc, exp) => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "short",
    });
    if (!acc[month]) acc[month] = { month, budget: 0, spent: 0 };
    acc[month].spent += exp.amount;
    return acc;
  }, {});

  //add budgets
  projects?.forEach((proj) => {
    const month = new Date(proj.startDate).toLocaleString("default", {
      month: "short",
    });
    if (!monthlyData[month])
      monthlyData[month] = { month, budget: 0, spent: 0 };
    monthlyData[month].budget += proj.budget;
  });

  const monthlyChartData = Object.values(monthlyData);

  const cardData = [
    {
      id: 1,
      title: "Total Budget",
      amount: `$${totalBudget ? totalBudget : 0}`,
      icon: <FiDollarSign />,
      des: "Across all projects",
    },
    {
      id: 2,
      title: "Budget Utilization",
      amount: `${utilization}%`,
      icon: <IoIosReturnRight />,
      des: `$${totalSpent} of $${totalBudget ? totalBudget : "0.00"}`,
    },
    {
      id: 3,
      title: "Total Profit",
      amount: `$${totalProfit ? totalProfit : 0}`,
      icon: <FaRegFolderClosed />,
      des: `${averageProfitMargin}% average profit`,
    },
    {
      id: 4,
      title: "Projects",
      amount: totalProjects,
      icon: <FaOldRepublic />,
      des: "Active projects tracked",
    },
  ];

  const tradsData = [
    {
      id: 1,
      title: "Total Budget",
      amount: `$${totalBudget ? totalBudget : 0}`,
      icon: <FiDollarSign />,
      des: "Across all projects",
    },
    {
      id: 2,
      title: "Total Spent",
      amount: `$${totalSpent ? totalSpent : 0}`,
      icon: <IoIosReturnRight />,
      des: "total spant",
    },
    {
      id: 3,
      title: "Active Projects",
      amount: totalProjects,
      icon: <FaRegFolderClosed />,
      des: "Currently in progress",
    },
  ];

  return (
    <div>
      <div className=" mx-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center ">
        <Title
          text="Reports & Analytics"
          des="Comprehensive insights into your project expenses and profitability"
        />

        <div className=" mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-2">
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
      <div className="mx-4">
        <div className="bg-[var(--body-bg-color)] flex flex-wrap justify-center items-center gap-2 p-2 my-4 rounded-full text-sm md:border md:border-[var(--border-color)] w-full">
          {[
            "Budget Analysis",
            "Expense Trends",
            "Category Breakdown",
            "Profitability",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 sm:px-4 sm:py-1.5 md:px-4 md:py-2 rounded-full capitalize transition-all duration-300 cursor-pointer text-xs sm:text-sm md:text-base ${
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
            <ProjectBarChart
              projects={projects}
              setProjects={setProjects}
              expenses={expenses}
              setExpenses={setExpenses}
              loading={loading}
              setLoading={setLoading}
              data={data}
            />
            <ProjectStatusDashboard
              data={data}
              totalProfit={totalProfit}
              totalProjects={totalProjects}
            />
          </>
        )}

        {activeTab === "Expense Trends" && (
          <>
            <TinyAreaChart data={monthlyChartData} />
            <div className=" grid grid-cols-1 md:grid-cols-3  gap-4 p-4 bg-[var(--bg-primary-color)] md:bg-[var(--body-bg-color)] ">
              {tradsData.map((card, index) => {
                return <Card key={index} card={card} />;
              })}
            </div>
          </>
        )}

        {activeTab === "Category Breakdown" && (
          <>
            <CategoryBreakdown expenses={expenses} />

            <CategoryComparison expenses={expenses} />
          </>
        )}

        {activeTab === "Profitability" && (
          <>
            <ProfitabilityBarChart projects={projects} expenses={expenses} />
            <PerformanceSummery projects={projects} expenses={expenses} />
          </>
        )}
      </>
    </div>
  );
};

export default Reports;
