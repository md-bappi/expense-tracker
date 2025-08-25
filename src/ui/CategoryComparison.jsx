import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CategoryComparison = () => {
  // Data for the chart
  const data = [
    { name: "Subcontractor", value: 25600, percentage: 39 },
    { name: "Materials", value: 18500, percentage: 28 },
    { name: "Equipment", value: 12300, percentage: 19 },
    { name: "Other", value: 5800, percentage: 9 },
    { name: "Transport", value: 3200, percentage: 5 },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm">Value: ${payload[0].value.toLocaleString()}</p>
          <p className="text-sm">
            Percentage: {payload[0].payload.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom y-axis ticks
  const yAxisTicks = [0, 6500, 13000, 19500, 26000];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-6xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Category Comparison
        </h2>

        {/* Chart Container */}
        <div className="h-80 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis
                ticks={yAxisTicks}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                axisLine={false}
                tickLine={false}
                domain={[0, 26000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#8b3dff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subcontractor value display */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="text-lg font-medium text-gray-800 text-center">
            Subcontractor value : ${data[0].value.toLocaleString()}
          </div>
        </div>

        {/* Category labels */}
        <div className="flex justify-between px-4">
          {data.map((item, index) => (
            <span key={index} className="text-sm text-gray-700">
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryComparison;
