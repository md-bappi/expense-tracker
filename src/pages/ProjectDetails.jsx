import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { IoIosReturnRight } from "react-icons/io";
import { FiDollarSign } from "react-icons/fi";
import { TiArrowLeft } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { RiDownload2Line } from "react-icons/ri";

import Card from "../ui/Card";
import Title from "../ui/Title";
import Button from "../ui/Button";
import { IoSearchOutline } from "react-icons/io5";
import Option from "../ui/Option";

const expenseOptions = [
  { value: "all-categories", label: "All Categories" },
  { value: "materials", label: "Materials" },
  { value: "transport", label: "Transport" },
  { value: "subcontractor", label: "Subcontractor" },
  { value: "equipment", label: "Equipment" },
  { value: "other", label: "Other" },
];

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("expenses");
  const [expenses, setExpenses] = useState([]);
  console.log(expenses);

  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/all-projects/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          setProject(null);
          return;
        }

        const data = await res.json();
        setProject(data.payload);
      } catch (error) {
        console.error("Error fetching project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchExpeses = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/getExpense/${id}`,
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
        console.log(data);
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
  }, [id]);

  const totalBudget = project?.budget;

  const totalSpent = expenses?.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const remaining = project?.budget - totalSpent;

  if (loading) {
    return (
      <p className=" text-center text-xl font-semibold mt-3">Loading...</p>
    );
  }

  if (!project) {
    return <div className="p-4 text-red-500">Project not found!</div>;
  }

  // Dynamic card data
  const cardData = [
    {
      id: 1,
      title: "Total Budget",
      amount: totalBudget,
      icon: <FiDollarSign />,
    },
    {
      id: 2,
      title: "Total Spent",
      amount: totalSpent ? totalSpent : 0,
      icon: <IoIosReturnRight />,
      des: project?.budget
        ? `${((totalSpent / project.budget) * 100).toFixed(0)}% of total budget`
        : "0% of total budget",
    },
    {
      id: 3,
      title: "Remaining",
      amount: remaining ? remaining : 0,
      icon: <FiDollarSign />,
    },
    {
      id: 4,
      title: "Status",
      status: project?.status || "N/A",
      Due: project?.deadline || "Not set",
      icon: <CiCalendar />,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="p-4 md:flex md:justify-between md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-5">
          <Link
            to="/projects"
            className="flex justify-center items-center gap-1 shadow-sm w-20 py-1.5 rounded-lg hover:bg-[var(--hover-bg-color)] duration-300 hover:shadow-md"
          >
            <TiArrowLeft />
            <span className="text-sm"> Back</span>
          </Link>

          <div className="mt-2">
            <Title text={project?.projectName} />
          </div>
        </div>
        <div className="flex gap-2 w-1/2 md:w-auto">
          <Button
            icon={<FaRegEdit />}
            text="Edit Project"
            href={`/edit-project/${project.id}`}
            style=" border border-[var(--border-color)] rounded-lg text-[var(--text-primary-color)] hover:bg-[var(--hover-bg-color)] hover:text-[var(--hover-text-color)] mt-4"
          />
          <Button
            icon={<GoPlus />}
            text="Add Project"
            href="/new-project"
            style="bg-[var(--btn-bg-color)] text-[var(--btn-text-color)] rounded-lg mt-4"
          />
        </div>
      </div>

      {/* Budget, Spent, Remaining, Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[var(--bg-primary-color)] md:bg-[var(--body-bg-color)]">
        {cardData.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      {/* Tabs */}
      <div
        className="bg-[var(--body-bg-color)] flex justify-start items-center gap-2 p-2 my-4 mx-4 rounded-full text-sm 
                md:border md:border-[var(--border-color)] w-72"
      >
        {["expenses", "overview", "reports"].map((tab) => (
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

      {/* Tab Content */}
      <>
        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <div className=" mt-4 mb-10">
            {/* Expense Filter */}
            <div
              className="bg-[var(--bg-primary-color)] m-4 p-4 border border-[var(--border-color)] rounded-lg md:mx-4 flex flex-col gap-3 w-auto 
             md:flex-row md:justify-between md:items-center md:py-4 md:px-6 md:rounded-lg"
            >
              {/* Search */}
              <form className="flex items-center gap-2 px-3 py-2 bg-[var(--hover-bg-color)] rounded-lg w-full md:w-2/3 shadow-sm">
                <IoSearchOutline className="text-gray-500 text-lg" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                />
              </form>

              {/* Category Filter */}
              <div className="w-full md:w-1/3">
                <Option options={expenseOptions} />
              </div>
            </div>

            {/* Expense History */}
            <div className="mx-4 bg-[var(--bg-primary-color)] rounded-lg pb-6">
              <div className="md:flex justify-between items-center md:px-6 my-4 py-4">
                <h2 className="  font-medium text-[var(--text-primary-color)] capitalize">
                  expense history
                </h2>
                <Button
                  icon={<GoPlus />}
                  text="Add Expense"
                  href={`/new-expense/${project._id}`}
                  style="bg-[var(--btn-bg-color)] text-[var(--btn-text-color)] rounded-lg mt-2"
                />
              </div>

              {/* Expense History Details */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mx-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-semibold">
                    <tr>
                      <th className="px-6 py-3">Description</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {expenses.length > 0 ? (
                      expenses.map((item) => (
                        <tr
                          key={item._id || item.id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4">{item.description}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {new Date(item.date).toLocaleDateString()}{" "}
                            {/* formatted */}
                          </td>
                          <td className="px-6 py-4 font-medium">
                            ${item.amount}
                          </td>
                          <td className="px-6 py-4">
                            {item.receipt ? "Yes" : "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No expenses recorded
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mb-4">
            {/* Project Details */}
            <div className="bg-white shadow-sm rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Project Details</h2>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500">Client</p>
                  <p className="font-medium">{project.company}</p>
                </div>

                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium">{project.category}</p>
                </div>

                <div>
                  <p className="text-gray-500">Start Date</p>
                  <p className="font-medium">{project.startDate}</p>
                </div>

                <div>
                  <p className="text-gray-500">Deadline</p>
                  <p className="font-medium">{project.deadline}</p>
                </div>

                <div>
                  <p className="text-gray-500">Notes</p>
                  <p className="font-medium">{project.notes || "No notes"}</p>
                </div>
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white shadow-sm rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>

              <div className="space-y-4">
                {project.expenses && project.expenses.length > 0 ? (
                  project.expenses.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="capitalize">{item.category}</span>
                      <span className="font-medium">
                        ${item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No expenses recorded</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="mx-6 p-6 bg-[var(--bg-primary-color)] rounded-lg  mt-4 mb-10 shadow">
            <h2 className="text-[var(--text-primary-color)] capitalize font-semibold mb-4">
              Project Report
            </h2>

            <div className="flex flex-col items-center justify-center text-center gap-2">
              <RiDownload2Line className="text-3xl text-[var(--text-primary-color)] opacity-70" />

              <h2 className="text-lg font-medium">Export Project Report</h2>
              <p className="text-sm text-gray-500">
                Generate a comprehensive report of your project expenses
              </p>

              <Button
                text="Export"
                href="/projects"
                style="bg-[var(--btn-bg-color)] text-[var(--btn-text-color)] rounded-lg mt-4 px-4 py-2"
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ProjectDetails;
