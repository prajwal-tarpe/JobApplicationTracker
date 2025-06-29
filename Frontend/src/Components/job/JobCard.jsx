import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import ActionModal from "../common/ActionModal";
import DeleteModal from "../common/DeleteModal";

function JobCard({ jobs, handleEditJob, handleDeleteJob }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [actionModalJobId, setActionModalJobId] = useState(null);
  const actionModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        actionModalRef.current &&
        !actionModalRef.current.contains(e.target)
      ) {
        setActionModalJobId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusStyles = (status) => {
    const baseStyles = {
      Rejected: "text-red-600",
      Interview: "text-blue-600",
      Offer: "text-green-600",
      Applied: "text-indigo-600",
    };
    return baseStyles[status] || "text-gray-600";
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs?.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-gray-300 rounded-lg shadow hover:shadow-md transition duration-300 p-5 text-gray-800 relative"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-base font-semibold text-gray-900">
                {job.jobTitle}
              </h2>

              <button
                onClick={() =>
                  setActionModalJobId(
                    actionModalJobId === job._id ? null : job._id
                  )
                }
                className="text-gray-600 hover:text-gray-800 text-xl transition cursor-pointer"
                title="Actions"
              >
                <BsThreeDotsVertical />
              </button>

              {actionModalJobId === job._id && (
                <div className="absolute right-4 top-10 z-20" ref={actionModalRef}>
                  <ActionModal
                    actionModalRef={actionModalRef}
                    handleEditJob={handleEditJob}
                    setActionModalJobId={setActionModalJobId}
                    job={job}
                    setJobToDelete={setJobToDelete}
                    setIsModalOpen={setIsModalOpen}
                  />
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-3">{job.companyName}</p>

            <div className="text-sm space-y-2">
              <p>
                <span className="font-medium text-gray-600">Link:</span>{" "}
                <a
                  href={job.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                >
                  <IoIosLink /> Open
                </a>
              </p>
              <p>
                <span className="font-medium text-gray-600">Date:</span>{" "}
                {new Date(job.applicationDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-gray-600">Status:</span>{" "}
                <span className={`font-semibold ${getStatusStyles(job.status)}`}>
                  {job.status}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-600">Notes:</span>{" "}
                {job.notes || "—"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && jobToDelete && (
        <DeleteModal
          jobToDelete={jobToDelete}
          setIsModalOpen={setIsModalOpen}
          setJobToDelete={setJobToDelete}
          handleDeleteJob={handleDeleteJob}
        />
      )}
    </>
  );
}

export default JobCard;
