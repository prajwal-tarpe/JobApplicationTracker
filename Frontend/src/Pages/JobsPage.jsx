import { useState } from "react";
import EditJobForm from "../Components/job/EditJobForm";
import JobFilters from "../Components/job/JobFilters";
import JobCard from "../Components/job/JobCard";
import JobTable from "../Components/job/JobTable";
import JobDataToggle from "../Components/job/JobDataToggle";

function JobsPage({ jobs, handleDeleteJob, handleJobUpdate, setFilters }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [tableView, setTableView] = useState(true);

  const handleEditJob = (jobId) => {
    const job = jobs.find((job) => job._id === jobId);
    setSelectedJob(job);
  };

  const closePopup = () => setSelectedJob(null);

  return (
    <div className="p-12 sm:p-6 md:p-8  w-full flex-1 flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-7xl">
        <JobFilters onFilterChange={setFilters} />
      </div>

      <div className="w-full max-w-7xl bg-white rounded-lg shadow-md border border-gray-300 mt-2 overflow-hidden">
        <div className="p-4 hidden md:block">
          <JobDataToggle setTableView={setTableView} tableView={tableView} />
        </div>

        <div className="w-full overflow-x-auto px-2 pb-4">
          {/* Card view for small screens */}
          <div className="block md:hidden">
            <JobCard
              jobs={jobs}
              handleEditJob={handleEditJob}
              handleDeleteJob={handleDeleteJob}
            />
          </div>

          {/* Table/Card toggle for medium and up */}
          <div className="hidden md:block">
            {tableView ? (
              <JobTable
                jobs={jobs}
                handleEditJob={handleEditJob}
                handleDeleteJob={handleDeleteJob}
              />
            ) : (
              <JobCard
                jobs={jobs}
                handleEditJob={handleEditJob}
                handleDeleteJob={handleDeleteJob}
              />
            )}
          </div>
        </div>
      </div>

      {/* Edit popup */}
      {selectedJob && (
        <EditJobForm
          job={selectedJob}
          onClose={closePopup}
          onJobUpdate={handleJobUpdate}
        />
      )}
    </div>
  );
}

export default JobsPage;
