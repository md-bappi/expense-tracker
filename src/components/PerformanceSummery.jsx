const PerformanceSummery = ({ projects, expenses }) => {
  // Calculate profit per project
  const projectStats = projects.map((project) => {
    const totalExpenses = expenses
      .filter((exp) => exp.projectCategory === project.category)
      .reduce((sum, exp) => sum + exp.amount, 0);

    const revenue = project.budget;
    const profit = revenue - totalExpenses;

    return {
      ...project,
      totalExpenses,
      profit,
    };
  });

  // Performance Summary
  const totalRevenue = projectStats.reduce((sum, p) => sum + p.budget, 0);
  const totalExpenses = projectStats.reduce(
    (sum, p) => sum + p.totalExpenses,
    0
  );
  const netProfit = totalRevenue - totalExpenses;
  const avgProfitMargin =
    totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col lg:flex-row gap-6">
      {/* Project Profit Margins */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="font-bold text-gray-800 text-xl mb-4">
          Project Profit Margins
        </h2>

        {projectStats.map((p, index) => (
          <div key={index} className="space-y-2">
            {/* Project Name */}
            <div className="flex justify-between items-center font-medium text-gray-800">
              <span>{p.projectName}</span>
              <span className="text-gray-600">
                ${p.budget.toLocaleString()}
              </span>
            </div>

            {/* Horizontal Bar */}
            <div className="bg-gray-200 rounded-full h-3 w-full overflow-hidden">
              <div
                className={`h-3 rounded-full ${
                  p.profit >= 0 ? "bg-green-500" : "bg-red-500"
                } transition-all duration-700`}
                style={{ width: `${Math.min(Math.abs(p.profitMargin), 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="w-full lg:w-80 bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
        <h2 className="font-bold text-gray-800 text-lg mb-2">
          Performance Summary
        </h2>
        <div className="text-3xl font-extrabold text-indigo-600">
          {avgProfitMargin.toFixed(1)}%
        </div>
        <div className="space-y-2 text-gray-700">
          <div>
            Total Budget:{" "}
            <span className="font-semibold">
              ${totalRevenue.toLocaleString()}
            </span>
          </div>
          <div>
            Total Expenses:{" "}
            <span className="font-semibold">
              ${totalExpenses.toLocaleString()}
            </span>
          </div>
          <div>
            Net Profit:{" "}
            <span
              className={`font-semibold ${
                netProfit > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${netProfit.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummery;
