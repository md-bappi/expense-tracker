import Header from "../ui/Header";
import { FiDollarSign } from "react-icons/fi";
import { IoIosReturnRight } from "react-icons/io";
import { FaRegFolderClosed } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";
import { AiOutlineBarChart } from "react-icons/ai";
import Card from "../ui/Card";
import Button from "../ui/Button";

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
  {
    id: 4,
    title: "Overdue Projects",
    amount: "1",
    icon: <CiWarning />,
    des: "Need attention",
  },
];

const recentProjects = [
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

const Dashboard = () => {
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
          <h2>Recent project</h2>
          <Button
            icon={<AiOutlineBarChart />}
            text="view all"
            href="/projects"
            style="bg-[var(--bg-primary-color)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary-color)] hover:bg-[var(--hover-bg-color)] hover:text-[var(--hover-text-color)] mt-4"
          />
        </div>

        <div className=" bg-[var(--bg-primary-color)] mt-4 p-4 rounded-lg">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className=" mt-4 p-4 bg-[var(--bg-primary-color)] rounded-lg shadow-sm hover:shadow-md duration-200 cursor-pointer"
            >
              <div className=" flex justify-between items-center">
                <div className="">
                  <h2 className=" font-medium text-[var(--text-primary-color)]">
                    {project.title}
                  </h2>
                  <p className=" text-xs text-[var(--text-muted-color)]">
                    {project.company}
                  </p>
                </div>

                <div className=" flex flex-col md:flex-row md:items-center gap-4">
                  <p className=" text-xs text-[var(--text-muted-color)]">
                    Budget:
                    <span className=" text-[var(--text-primary-color)] font-medium">
                      {project.budget}
                    </span>
                  </p>
                  <p className=" text-xs text-[var(--text-muted-color)]">
                    Spent:{" "}
                    <span className=" text-[var(--text-primary-color)] font-medium">
                      {project.spant}
                    </span>
                  </p>
                  <p
                    className={` text-xs font-medium ${
                      project.status === "Overdue"
                        ? "text-red-600"
                        : "text-[var(--text-primary-color)]"
                    }`}
                  >
                    {project.status}
                  </p>
                  <p className=" text-xs text-[var(--text-muted-color)]">
                    {project.data}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
