// App.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded border border-gray-200">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p className="text-green-500">
          Expenses: ${payload[0].payload.Expenses.toLocaleString()}
        </p>
        <p className="text-yellow-500">
          Profit: ${payload[0].payload.Profit.toLocaleString()}
        </p>
        <p className="text-purple-500">
          Revenue: ${payload[0].payload.Revenue.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const ProfitabilityBarChart = ({ projects, expenses }) => {
  // Transform projects + expenses into chart data
  const chartData = projects.map((project) => {
    // Calculate total expenses for this project
    const totalExpenses = expenses
      .filter((exp) => exp.projectCategory === project.category)
      .reduce((sum, exp) => sum + exp.amount, 0);

    const revenue = project.budget;
    const profit = revenue - totalExpenses;

    return {
      name: project.projectName,
      Revenue: revenue,
      Expenses: totalExpenses,
      Profit: profit,
    };
  });

  console.log("Chart Data:", chartData);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-md text-gray-700 font-semibold mb-4">
        Project Profitability Analysis
      </h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Revenue" fill="#7C3AED" />
            <Bar dataKey="Expenses" fill="#22C55E" />
            <Bar dataKey="Profit" fill="#FBBF24" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitabilityBarChart;
