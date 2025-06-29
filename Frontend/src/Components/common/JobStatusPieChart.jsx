import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#facc15', '#ef4444']; // Indigo, Green, Yellow, Red

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 px-3 py-2 rounded shadow-md border dark:border-gray-600">
        <p className="font-medium">{name}</p>
        <p>{value} application(s)</p>
      </div>
    );
  }
  return null;
};

const JobStatusPieChart = ({ data }) => {
  const pieData = Object.entries(data || {}).map(([key, value]) => ({
    name: key,
    value,
  }));

  const isEmpty = pieData.length === 0 || pieData.every(item => item.value === 0);

  return (
    <div className="w-full m-4 max-w-3xl mx-auto h-[350px] bg-whit rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6 text-black">
        Job Status Distribution
      </h2>

      {isEmpty ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No data available to display.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: '14px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default JobStatusPieChart;