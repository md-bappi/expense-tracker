import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TinyAreaChart = () => {
  // Monthly budget vs spent data
  const data = [
    { month: "Jan", budget: 20000, spent: 12000 },
    { month: "Feb", budget: 22000, spent: 15000 },
    { month: "Mar", budget: 25000, spent: 20000 },
    { month: "Apr", budget: 27000, spent: 22000 },
    { month: "May", budget: 30000, spent: 25000 },
    { month: "Jun", budget: 28000, spent: 23000 },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-200 shadow-md rounded-lg text-sm">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">
            Budget: ${payload[0].payload.budget.toLocaleString()}
          </p>
          <p className="text-green-500">
            Spent: ${payload[0].payload.spent.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format Y-axis values
  const formatYAxis = (value) => `$${(value / 1000).toFixed(0)}k`;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-white md:bg-[var(--body-bg-color)]">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">
          Monthly Budget vs Spent
        </h2>

        {/* Area Chart */}
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: "#4b5563", fontSize: 12 }} />
              <YAxis
                domain={[0, 30000]} // fixed Y-axis range
                tickFormatter={formatYAxis}
                tick={{ fill: "#4b5563", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="budget"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.2}
                name="Budget"
              />
              <Area
                type="monotone"
                dataKey="spent"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.2}
                name="Spent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-500 rounded mr-2"></div>
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

export default TinyAreaChart;
