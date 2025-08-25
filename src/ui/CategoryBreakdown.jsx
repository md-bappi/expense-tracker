import {
  FaHardHat,
  FaTruck,
  FaTools,
  FaBoxOpen,
  FaEllipsisH,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const CategoryBreakdown = () => {
  // Expense distribution data
  const expenseDistribution = [
    {
      category: "Materials",
      percentage: 28,
      amount: "$18,500",
      icon: <FaBoxOpen className="text-blue-500 text-xl" />,
      color: "#3B82F6",
    },
    {
      category: "Subcontractor",
      percentage: 39,
      amount: "$25,600",
      icon: <FaHardHat className="text-orange-500 text-xl" />,
      color: "#F97316",
    },
    {
      category: "Transport",
      percentage: 5,
      amount: "$3,200",
      icon: <FaTruck className="text-green-500 text-xl" />,
      color: "#10B981",
    },
    {
      category: "Other",
      percentage: 9,
      amount: "$5,800",
      icon: <FaEllipsisH className="text-purple-500 text-xl" />,
      color: "#8B5CF6",
    },
    {
      category: "Equipment",
      percentage: 19,
      amount: "$12,300",
      icon: <FaTools className="text-red-500 text-xl" />,
      color: "#EF4444",
    },
  ];

  // Data for the pie chart
  const pieChartData = expenseDistribution.map((item) => ({
    name: item.category,
    value: item.percentage,
    color: item.color,
    amount: item.amount,
  }));

  // Calculate total expenses
  const totalExpenses = expenseDistribution.reduce((total, item) => {
    return total + parseFloat(item.amount.replace("$", "").replace(",", ""));
  }, 0);

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{data.value}%</p>
          <p className="text-sm">{data.amount}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend for the pie chart
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center text-xs">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
            Expense Distribution
          </h2>
          <div className="bg-white rounded-lg shadow-sm px-4 py-2">
            <span className="text-sm text-gray-600">Total Expenses: </span>
            <span className="text-sm font-medium text-blue-600">
              ${totalExpenses.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section - Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 order-2 lg:order-1">
            <h2 className="text-sm font-semibold text-gray-800 mb-6 border-b pb-2">
              Expense Visualization
            </h2>

            {/* Pie Chart Container */}
            <div className="h-72 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <Legend content={renderLegend} />

            {/* Summary Section */}
            <div className="mt-8 p-5 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">
                  Total Expenses
                </span>
                <span className="font-bold text-xl text-blue-600">
                  ${totalExpenses.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Subcontractor costs represent the largest portion of expenses at
                39%, followed by Materials at 28%.
              </p>
            </div>
          </div>

          {/* Right Section - Category Details */}
          <div className="bg-white rounded-xl shadow-md p-6 order-1 lg:order-2">
            <h2 className="text-sm font-semibold text-gray-800 mb-6 border-b pb-2">
              Category Details
            </h2>

            <div className="space-y-5">
              {expenseDistribution.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {item.category}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.percentage}% of total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{item.amount}</p>
                    <div className="w-24 mt-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Breakdown */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Detailed Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Highest Expense</p>
                  <p className="font-medium text-gray-800">
                    Subcontractor - $25,600
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Lowest Expense</p>
                  <p className="font-medium text-gray-800">
                    Transport - $3,200
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdown;
