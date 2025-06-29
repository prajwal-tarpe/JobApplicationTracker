import { useEffect, useState } from "react";

const JobFilters = ({ onFilterChange }) => {
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    onFilterChange({ status, sortOrder, search });
  }, [status, sortOrder, search]);

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 py-4 bg-white rounded-lg shadow-sm border border-gray-300">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Search */}
      <div className="w-full sm:w-80">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search job title or company..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default JobFilters;