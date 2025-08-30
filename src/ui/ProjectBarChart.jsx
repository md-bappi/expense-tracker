import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// function getTotalBudgetByCategory(projects) {
//   return projects?.reduce((acc, project) => {
//     const category = project.category || "Uncategorized";
//     if (!acc[category]) acc[category] = 0;
//     acc[category] += Number(project.budget) || 0;
//     return acc;
//   }, {});
// }

// function getTotalExpensesByCategory(expenses) {
//   return expenses?.reduce((acc, expense) => {
//     const category = expense.projectCategory || "Uncategorized"; // ✅ correct field
//     if (!acc[category]) acc[category] = 0;
//     acc[category] += Number(expense.amount) || 0;
//     return acc;
//   }, {});
// }

const ProjectBarChart = ({
  projects = [],
  setProjects,
  expenses = [],
  setExpenses,
  loading,
  setLoading,
  data,
}) => {
  console.log(projects);
  console.log(expenses);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const res = await fetch("http://localhost:4000/api/v1/all-projects", {
  //         method: "GET",
  //         credentials: "include",
  //       });
  //       if (!res.ok) {
  //         setProjects([]);
  //         return;
  //       }
  //       const data = await res.json();
  //       setProjects(data.payload || []);
  //     } catch (err) {
  //       console.error("Error fetching projects:", err);
  //       setProjects([]);
  //     }
  //   };

  //   const fetchExpenses = async () => {
  //     try {
  //       const res = await fetch("http://localhost:4000/api/v1/all-expenses", {
  //         method: "GET",
  //         credentials: "include",
  //       });
  //       if (!res.ok) {
  //         setExpenses([]);
  //         return;
  //       }
  //       const data = await res.json();
  //       const expenseList = Array.isArray(data.payload?.expenses)
  //         ? data.payload.expenses
  //         : [];
  //       setExpenses(expenseList);
  //     } catch (err) {
  //       console.error("Error fetching expenses:", err);
  //       setExpenses([]);
  //     }
  //   };

  //   Promise.all([fetchProjects(), fetchExpenses()]).finally(() =>
  //     setLoading(false)
  //   );
  // }, []);

  if (loading) {
    return <p className="text-center text-xl font-semibold mt-3">Loading...</p>;
  }

  // const totalCategoryBudget = getTotalBudgetByCategory(projects);
  // const totalCategoryExpenses = getTotalExpensesByCategory(expenses);

  // // 🔹 Merge budgets & expenses by category
  // const allCategories = new Set([
  //   ...Object.keys(totalCategoryBudget),
  //   ...Object.keys(totalCategoryExpenses),
  // ]);

  // const data = Array.from(allCategories).map((category) => ({
  //   name: category.replace(/-/g, " "), // clean name
  //   budget: totalCategoryBudget[category] || 0,
  //   spent: totalCategoryExpenses[category] || 0,
  // }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const budget = payload.find((p) => p.dataKey === "budget")?.value || 0;
      const spent = payload.find((p) => p.dataKey === "spent")?.value || 0;
      return (
        <div className="p-4 bg-white border border-gray-200 shadow-md rounded-lg">
          <p className="font-bold text-gray-800">{label}</p>
          <p className="text-blue-600">Budget: ${budget.toLocaleString()}</p>
          <p className="text-green-500">Spent: ${spent.toLocaleString()}</p>
          <p className="text-gray-500">
            Remaining: ${(budget - spent).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value) =>
    value >= 1000 ? `$${value / 1000}k` : `$${value}`;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-sm mb-8">Budget vs Actual Spending</h2>

        {/* Chart */}
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                tick={{ fill: "#4b5563", fontSize: 12 }}
                interval={0}
                height={70}
              />
              <YAxis
                tick={{ fill: "#4b5563", fontSize: 12 }}
                tickFormatter={formatYAxis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="budget"
                fill="#6366f1"
                name="Budget"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="spent"
                fill="#10b981"
                name="Spent"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cards */}
        <div className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-sm w-full max-w-xs"
              >
                <h3 className="font-semibold text-gray-800 text-sm mb-2">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">
                    ${Number(item.budget || 0).toLocaleString()}
                  </span>
                  <span className="text-green-500">
                    ${Number(item.spent || 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{
                      width: `${
                        item.budget > 0 ? (item.spent / item.budget) * 100 : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-600 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Budget</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Spent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBarChart;
