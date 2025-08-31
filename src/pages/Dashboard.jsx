import Header from "../ui/Header";
import { FiDollarSign } from "react-icons/fi";
import { IoIosReturnRight } from "react-icons/io";
import { FaRegFolderClosed } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";
import { AiOutlineBarChart } from "react-icons/ai";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useState, useEffect } from "react";
import Loading from "../ui/Loading";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(expenses);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/all-projects", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setProjects([]);
        }
        const data = await res.json();
        setProjects(data.payload || []);
        setLoading(false);
      } catch (error) {
        setProjects([]);
        setLoading(false);
      }
    };

    const fetchExpense = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/getUserExpenses`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          setExpenses([]);
        }

        const data = await res.json();
        setExpenses(data.payload?.expenses || []);
        setLoading(false);
      } catch (error) {
        setExpenses([]);
        setLoading(false);
      }
    };

    fetchProjects();
    fetchExpense();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const totalBudget = projects
    ?.reduce((acc, project) => acc + (project.budget || 0), 0)
    .toFixed(2);

  const totalSpent = expenses
    ?.reduce((acc, expense) => acc + (expense.amount || 0), 0)
    .toFixed(2);

  console.log(totalSpent);

  const projectsCount = projects?.length;

  const cardData = [
    {
      id: 1,
      title: "Total Budget",
      amount: `$${totalBudget}`,
      icon: <FiDollarSign />,
      des: "Across all projects",
    },
    {
      id: 2,
      title: "Total Spent",
      amount: `$${totalSpent}`,
      icon: <IoIosReturnRight />,
      des:
        totalBudget > 0
          ? `${((totalSpent / totalBudget) * 100).toFixed(0)}% of total budget`
          : "0% of total budget",
    },
    {
      id: 3,
      title: "Active Projects",
      amount: projectsCount,
      icon: <FaRegFolderClosed />,
      des: "Currently in progress",
    },
    {
      id: 4,
      title: "Overdue Projects",
      amount: projects.filter((p) => p.status === "Overdue").length,
      icon: <CiWarning />,
      des: "Need attention",
    },
  ];

  // Sort projects by createdAt/dateLine and pick latest 10
  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.dateLine) -
        new Date(a.createdAt || a.dateLine)
    )
    .slice(0, 10);

  return (
    <div className=" md:pb-8 bg-[var(--body-bg-color)]">
      <Header />

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[var(--bg-primary-color)] md:bg-[var(--body-bg-color)] ">
        {cardData.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>

      {/* Recent Projects */}
      <div className="p-4 shadow-sm bg-[var(--bg-primary-color)] rounded-lg md:mx-4 mt-4">
        <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
          <h2>Recent Projects</h2>
          <Button
            icon={<AiOutlineBarChart />}
            text="View All"
            href="/projects"
            style="bg-[var(--bg-primary-color)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary-color)] hover:bg-[var(--hover-bg-color)] hover:text-[var(--hover-text-color)] mt-4"
          />
        </div>

        <div className=" bg-[var(--bg-primary-color)] mt-4 p-4 rounded-lg">
          {recentProjects.length > 0 ? (
            recentProjects.map((project) => (
              <div
                key={project._id || project.id}
                className=" mt-4 p-4 bg-[var(--bg-primary-color)] rounded-lg shadow-sm hover:shadow-md duration-200 cursor-pointer"
              >
                <div className=" flex justify-between items-center">
                  <div>
                    <h2 className=" font-medium text-[var(--text-primary-color)]">
                      {project.projectName || project.title}
                    </h2>
                    <p className=" text-xs text-[var(--text-muted-color)]">
                      {project.clientName || project.company}
                    </p>
                  </div>

                  <div className=" flex flex-col md:flex-row md:items-center gap-4">
                    <p className=" text-xs text-[var(--text-muted-color)]">
                      Budget:{" "}
                      <span className=" text-[var(--text-primary-color)] font-medium">
                        ${project.budget}
                      </span>
                    </p>
                    <p className=" text-xs text-[var(--text-muted-color)]">
                      Spent:{" "}
                      <span className=" text-[var(--text-primary-color)] font-medium">
                        ${project.spent || 0}
                      </span>
                    </p>
                    <p
                      className={` text-xs font-medium ${
                        project.status === "Overdue"
                          ? "text-red-600"
                          : "text-[var(--text-primary-color)]"
                      }`}
                    >
                      {project.status || "In Progress"}
                    </p>
                    <p className=" text-xs text-[var(--text-muted-color)]">
                      {new Date(
                        project.createdAt || project.dateLine
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-[var(--text-muted-color)]">
              No recent projects found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
