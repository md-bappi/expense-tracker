import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Option from "../ui/Option";
import Title from "../ui/Title";
import { IoSearchOutline } from "react-icons/io5";

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

const Projects = () => {
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
        <form className="flex items-center gap-2 p-2 bg-[var(--hover-bg-color)] rounded-lg w-full md:w-1/3">
          <IoSearchOutline className="text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full outline-none text-sm bg-transparent"
          />
        </form>

        {/* Status Filter */}
        <div className="w-full md:w-1/4">
          <Option options={statusOptions} />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-1/4">
          <Option options={categoryOptions} />
        </div>
      </div>

      {/* Projects */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 bg-[var(--bg-primary-color)] md:bg-[var(--body-bg-color)]  mt-4 rounded-lg">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[var(--bg-primary-color)] rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col justify-between cursor-pointer group"
          >
            {/* Title + Company */}
            <div>
              <Link
                to={`/projects/${project.id}`}
                className="font-bold text-xl text-[var(--text-primary-color)] hover:text-[var(--hover-text-color)] transition-colors"
              >
                {project.title}
              </Link>
              <p className="text-gray-400 mt-1">{project.company}</p>
            </div>

            {/* Budget + Spent */}
            <div className="mt-4 text-gray-500 text-sm space-y-1">
              <p>
                <span className="font-semibold">Budget:</span> {project.budget}
              </p>
              <p>
                <span className="font-semibold">Spent:</span>{" "}
                {project.spent || project.spant}
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
              <p>
                <span className="font-semibold">Due Date:</span>{" "}
                {project.date || project.data}
              </p>
            </div>

            {/* Category + Button */}
            <div className="mt-4 grid grid-cols-3 items-center">
              <p className="text-gray-500 text-sm col-span-2 ">
                <span className="font-semibold">Category:</span>{" "}
                {project.category}
              </p>

              <Link
                to={`/projects/${project.id}`}
                className=" text-[var(--btn-bg-color)] border border-[var(--border-color)] col-span-1 text-center py-2 text-sm rounded-lg shadow-sm hover:shadow-md transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
