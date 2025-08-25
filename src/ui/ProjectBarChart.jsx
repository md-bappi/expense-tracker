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

const ProjectBarChart = () => {
  // Sample data for the chart
  const data = [
    { name: "Website Redesign", budget: 30000, spent: 24500 },
    { name: "Mobile ARP Dev", budget: 22000, spent: 18500 },
    { name: "Brand Identity", budget: 15000, spent: 15000 },
    { name: "E-commerce Platform", budget: 35000, spent: 29500 },
    { name: "Marketing Campaign", budget: 18000, spent: 12500 },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-white border border-gray-200 shadow-md rounded-lg">
          <p className="font-bold text-gray-800">{label}</p>
          <p className="text-blue-600">
            Budget: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-green-500">
            Spent: ${payload[1].value.toLocaleString()}
          </p>
          <p className="text-gray-500">
            Remaining: ${(payload[0].value - payload[1].value).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tick formatter for Y-axis
  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `$${value / 1000}k`;
    }
    return `$${value}`;
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className=" text-sm mb-8">Budget vs Actual Spending</h2>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
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

        <div className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 text-sm mb-2">
                {item.name}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">
                  ${item.budget.toLocaleString()}
                </span>
                <span className="text-green-500">
                  ${item.spent.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(item.spent / item.budget) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

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
