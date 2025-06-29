import { IoIosLink } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import DeleteModal from "../common/DeleteModal";
import ActionModal from "../common/ActionModal";

function JobTable({ jobs, handleDeleteJob, handleEditJob }) {
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
      Rejected: {
        text: "text-red-600",
        bg: "bg-red-100",
        dot: "bg-red-600",
      },
      Interview: {
        text: "text-blue-600",
        bg: "bg-blue-100",
        dot: "bg-blue-600",
      },
      Offer: {
        text: "text-green-600",
        bg: "bg-green-100",
        dot: "bg-green-600",
      },
      Applied: {
        text: "text-indigo-600",
        bg: "bg-indigo-100",
        dot: "bg-indigo-600",
      },
    };

    return baseStyles[status] || baseStyles.default;
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm text-left text-gray-800 border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0 z-10">
            <tr className="border-b border-gray-300">
              {[
                "Company",
                "Job Title",
                "Link",
                "Date",
                "Status",
                "Notes",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className={`px-6 py-3 whitespace-nowrap ${
                    col === "Actions" ? "text-center" : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {jobs?.map((job) => {
              const statusStyles = getStatusStyles(job.status);
              return (
                <tr
                  key={job._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{job.companyName}</td>
                  <td className="px-6 py-4 font-medium">{job.jobTitle}</td>
                  <td className="px-6 py-4 text-blue-600 underline text-xl">
                    <a
                      href={job.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoIosLink />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(job.applicationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-medium ${statusStyles.text} ${statusStyles.bg}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${statusStyles.dot}`}
                      ></span>
                      {job.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{job.notes}</td>
                  <td className="px-6 py-4 relative text-center">
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
                      <ActionModal actionModalRef={actionModalRef} handleEditJob={handleEditJob} setActionModalJobId={setActionModalJobId} job={job} setJobToDelete={setJobToDelete} setIsModalOpen={setIsModalOpen}/>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default JobTable;