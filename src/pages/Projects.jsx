import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Option from "../ui/Option";
import Title from "../ui/Title";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Loading from "../ui/Loading";

const statusOptions = [
  { value: "all-status", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" },
];

const categoryOptions = [
  { value: "all-categories", label: "All Categories" },
  { value: "web-development", label: "Web Development" },
  { value: "app-development", label: "App Development" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/v1/all-projects`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setProjects(data.payload || []);
      } catch (error) {
        setProjects([]);
      }
    };

    const fetchExpenses = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/getUserExpenses`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setExpenses(data.payload?.expenses || []);
      } catch (error) {
        setExpenses([]);
      }
    };

    Promise.all([fetchProjects(), fetchExpenses()]).then(() =>
      setLoading(false)
    );
  }, []);

  if (loading) {
    return <Loading />;
  }

  // 🔍 Filtering
  const filteredProjects = projects?.filter((project) => {
    const matchCategory =
      selectedCategory === "all-categories" ||
      project.category?.toLowerCase() === selectedCategory.toLowerCase();

    const query = searchQuery.toLowerCase();
    const matchSearch =
      project.projectName?.toLowerCase().includes(query) ||
      project.company?.toLowerCase().includes(query);

    return matchCategory && matchSearch;
  });

  return (
    <div>
      <div className="bg-[var(--bg-primary-color)] p-4 md:flex md:justify-between md:items-center md:bg-[var(--body-bg-color)]">
        <Title text="projects" des="Manage your project portfolio" />
        <Button
          text="new project"
          href="/new-project"
          style="bg-[var(--btn-bg-color)] text-[var(--btn-text-color)] rounded-lg mt-4"
        />
      </div>

      {/* Filter */}
      <div
        className="bg-[var(--bg-primary-color)] px-4 md:mx-4  flex flex-col gap-2 w-auto 
                md:flex-row md:justify-between md:items-center md:py-6 md:rounded-lg"
      >
        {/* Search */}
        <form
          className="flex items-center gap-2 p-2 bg-[var(--hover-bg-color)] rounded-lg w-full md:w-1/3"
          onSubmit={(e) => e.preventDefault()}
        >
          <IoSearchOutline className="text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full outline-none text-sm bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Status Filter (UI only) */}
        <div className="w-full md:w-1/4">
          <Option options={statusOptions} />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-1/4">
          <select
            className="w-full p-2 rounded-lg bg-[var(--hover-bg-color)] text-sm outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects */}
      <div
        className={`grid gap-4  ${
          projects.length === 0
            ? " lg:grid-cols-1"
            : "md:grid-cols-2 lg:grid-cols-3"
        } p-4 bg-[var(--bg-primary-color)] md:bg-[var(--body-bg-color)]  mt-4 rounded-lg`}
      >
        {filteredProjects?.length > 0 ? (
          filteredProjects?.map((project, index) => {
            // Calculate spent dynamically
            const projectSpent = expenses
              .filter((exp) => exp.projectId === project._id)
              .reduce((acc, exp) => acc + (exp.amount || 0), 0)
              .toFixed(2);

            return (
              <div
                key={index}
                className="bg-[var(--bg-primary-color)] rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col justify-between cursor-pointer group"
              >
                {/* Title + Company */}
                <div>
                  <Link
                    to={`/projects/${project._id}`}
                    className="font-bold text-xl text-[var(--text-primary-color)] hover:text-[var(--hover-text-color)] transition-colors"
                  >
                    {project.projectName}
                  </Link>
                  <p className="text-gray-400 mt-1">{project.company}</p>
                </div>

                {/* Budget + Spent */}
                <div className="mt-4 text-gray-500 text-sm space-y-1">
                  <p className=" flex gap-1">
                    <span className="font-semibold">Budget:</span>{" "}
                    <span className=" font-bold">{project.budget}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Spent:</span>{" "}
                    <span className="font-bold">{projectSpent}</span>
                  </p>
                </div>

                {/* Status + Due Date */}
                <div className="mt-3 text-gray-500 text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`font-medium ${
                        project.status === "Completed"
                          ? "text-green-500"
                          : project.status === "In Progress"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {project.status}
                    </span>
                  </p>
                  <p className=" flex gap-1">
                    <span className="font-semibold">Date Line:</span>{" "}
                    <span className=" font-bold">{project.dateLine}</span>
                  </p>
                </div>

                {/* Category + Button */}
                <div className="mt-4 grid grid-cols-3 items-center">
                  <p className="text-gray-500 text-sm col-span-2 flex gap-1">
                    <span className="font-semibold">Category:</span>{" "}
                    <span className=" font-bold">{project.category}</span>
                  </p>

                  <Link
                    to={`/projects/${project._id}`}
                    className=" text-[var(--btn-bg-color)] border border-[var(--border-color)] col-span-1 text-center py-2 text-sm rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No projects found</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
