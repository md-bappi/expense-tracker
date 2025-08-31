import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "./Loading";

const CategoryComparison = ({ expenses = [] }) => {
  // 1. Calculate totals for each category
  const categoryTotals = expenses.reduce((acc, exp) => {
    const cat = exp.expenseCategory?.replace(/-/g, " ") || "Other";
    acc[cat] = (acc[cat] || 0) + Number(exp.amount || 0);
    return acc;
  }, {});

  // 2. Calculate total for percentage calculations
  const totalAmount = Object.values(categoryTotals).reduce(
    (sum, val) => sum + val,
    0
  );

  // 3. Transform into chart data
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    percentage: totalAmount > 0 ? ((value / totalAmount) * 100).toFixed(1) : 0,
  }));

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

  // Custom Y-axis ticks (based on max value dynamically)
  const maxValue = Math.max(...data.map((d) => d.value), 0);
  const step = maxValue > 0 ? Math.ceil(maxValue / 4) : 1000;
  const yAxisTicks = Array.from({ length: 5 }, (_, i) => i * step);

  if (expenses.length === 0) {
    return <Loading />;
  }

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
                domain={[0, maxValue]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#8b3dff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top category value display */}
        {data.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="text-lg font-medium text-gray-800 text-center">
              Highest category ({data[0].name}) : $
              {data[0].value.toLocaleString()} ({data[0].percentage}%)
            </div>
          </div>
        )}

        {/* Category labels with percentages */}
        <div className="flex justify-between px-4 flex-wrap gap-3">
          {data.map((item, index) => (
            <span key={index} className="text-sm text-gray-700">
              {item.name} – {item.percentage}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryComparison;
