function SummaryCard({ label, value, color }) {
  return (
    <div className={`rounded-xl shadow-sm p-5 text-center ${color} dark:bg-opacity-10`}>
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-600 mt-2">{value}</div>
    </div>
  );
}

export default SummaryCard;