import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

const ProjectStatusDashboard = ({ data, totalProfit, totalProjects }) => {
  console.log(data);
  // Project data
  const projectsCategory = [
    {
      name: "Web Development",
      category: "web-development",
      spent: "$8,500",
      status: "On Track",
      remaining: "$6,500",
    },
    {
      name: "App Development",
      category: "app-development",
      spent: "$18,000",
      status: "On Track",
      remaining: "$7,000",
    },
    {
      name: "Design",
      category: "design",
      spent: "$30,000",
      status: "Near Limit",
      remaining: "$0",
    },
    {
      name: "Marketing Campaign",
      spent: "$5,600",
      status: "On Track",
      remaining: "$6,400",
    },
  ];

  // Budget health data
  const budgetHealth = {
    totalRemaining: "$19,700",
    statusCounts: [
      { status: "On Track", count: totalProjects },
      { status: "Near Budget Limit", count: 1 },
      { status: "Over Budget", count: 1 },
    ],
  };

  // Status color + icon mapping (react-icons)
  const statusStyles = {
    "On Track": {
      color: "bg-green-100 text-green-800",
      icon: <FaCheckCircle className="w-4 h-4 text-green-600 mr-1" />,
    },
    "Over Budget": {
      color: "bg-red-100 text-red-800",
      icon: <FaTimesCircle className="w-4 h-4 text-red-600 mr-1" />,
    },
    "Near Limit": {
      color: "bg-yellow-100 text-yellow-800",
      icon: <FaExclamationTriangle className="w-4 h-4 text-yellow-600 mr-1" />,
    },
    "Near Budget Limit": {
      color: "bg-yellow-100 text-yellow-800",
      icon: <FaExclamationTriangle className="w-4 h-4 text-yellow-600 mr-1" />,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Project List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              📋 Project Status Summary
            </h2>

            <div className="space-y-5">
              {data.map((project, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {project.spent} spent
                    </p>
                  </div>

                  <div className="text-right">
                    {/* <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                        statusStyles[project.status].color
                      }`}
                    >
                      {statusStyles[project.status].icon}
                      {project.status}
                    </span> */}
                    <span className=" text-green-500 text-sm">Active</span>
                    <p className="text-sm mt-2 font-medium text-gray-700">
                      {project && project.budget - project.spent} remaining
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Health Section */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              💰 Budget Health
            </h2>

            <div className="mb-8">
              <p className="text-gray-600 mb-1">Total Remaining Budget</p>
              <p className="font-bold text-3xl text-blue-600">{totalProfit}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-4">Project Status</h3>
              <div className="space-y-4">
                {budgetHealth.statusCounts.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        statusStyles[item.status].color
                      }`}
                    >
                      {statusStyles[item.status].icon}
                      {item.status}
                    </span>
                    <span className="font-semibold text-gray-700">
                      {item.count} projects
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusDashboard;
