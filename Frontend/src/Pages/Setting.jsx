import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleSuccess } from "../utils";
import ExportCSV from "../Components/common/ExportCSV";
import ExportPDF from "../Components/common/ExportPDF";
import DeleteModal from "../Components/common/DeleteModal"; // ✅ Make sure the path is correct

function Setting({ deleteAllJobs, jobs }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("loggedInUser");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out Successfully!");
    navigate("/");
  };

  const openDeleteAllModal = () => {
    setIsModalOpen(true);
    setJobToDelete({ _id: "ALL", companyName: "All Jobs" });
  };

  const handleDeleteJob = (id) => {
    if (id === "ALL") {
      deleteAllJobs();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-6 bg-white rounded-xl shadow-md space-y-5 text-sm">
      <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
      <div className="flex items-center justify-center bg-gray-100 px-3 py-2 rounded-md border border-gray-200 gap-2">
        <span className="text-gray-600 font-semibold">Logged in as:</span>
        <span className="text-blue-600 font-semibold uppercase truncate max-w-[150px]">
          {user}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={deleteToken}
          className="w-full px-3 py-2 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
        >
          Logout
        </button>

        <button
          onClick={openDeleteAllModal}
          className="w-full px-3 py-2 rounded-md text-white text-sm font-medium bg-red-600 hover:bg-red-700 transition cursor-pointer"
        >
          Delete All
        </button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <ExportCSV jobs={jobs} />
        <ExportPDF jobs={jobs} />
      </div>

      {isModalOpen && (
        <DeleteModal
          jobToDelete={jobToDelete}
          setIsModalOpen={setIsModalOpen}
          setJobToDelete={setJobToDelete}
          handleDeleteJob={handleDeleteJob}
        />
      )}
    </div>
  );
}

export default Setting;
