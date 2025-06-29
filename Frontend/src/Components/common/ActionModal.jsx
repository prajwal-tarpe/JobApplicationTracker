import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";


function ActionModal({actionModalRef, handleEditJob, setActionModalJobId, job, setJobToDelete, setIsModalOpen}) {
  return (
    <div
      ref={actionModalRef}
      className="absolute right-4 top-10 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-20"
    >
      <button
        onClick={() => {
          handleEditJob(job._id);
          setActionModalJobId(null);
        }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        <FiEdit /> Edit
      </button>
      <button
        onClick={() => {
          setJobToDelete(job);
          setIsModalOpen(true);
          setActionModalJobId(null);
        }}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
      >
        <TiDeleteOutline /> Delete
      </button>
    </div>
  );
}

export default ActionModal;
