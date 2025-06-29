import Loader from '../Components/common/Loader';
import SummaryCard from '../Components/common/SummaryCard';
import JobStatusPieChart from '../Components/common/JobStatusPieChart';

function Home({ jobStats, loading }) {
  const statusCount = jobStats?.statusCount || {};

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Job Application Summary</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <SummaryCard label="Total Jobs" value={jobStats?.totalJobs || 0} color="bg-blue-100" />
            <SummaryCard label="Applied" value={statusCount.Applied || 0} color="bg-yellow-100" />
            <SummaryCard label="Interview" value={statusCount.Interview || 0} color="bg-indigo-100" />
            <SummaryCard label="Offer" value={statusCount.Offer || 0} color="bg-green-100" />
            <SummaryCard label="Rejected" value={statusCount.Rejected || 0} color="bg-red-100" />
          </div>
          <JobStatusPieChart data={statusCount} />
        </>
      )}
    </div>
  );
}

export default Home;
