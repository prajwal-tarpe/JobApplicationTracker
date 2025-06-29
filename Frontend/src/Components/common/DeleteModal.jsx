function DeleteModal({ jobToDelete, setIsModalOpen, setJobToDelete, handleDeleteJob}) {
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl px-6 py-5 w-[320px] sm:w-[300px] text-center transition-all duration-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete{" "}
              <strong className="text-gray-800">
                {jobToDelete?.companyName}
              </strong>
              ?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  handleDeleteJob(jobToDelete._id);
                  setIsModalOpen(false);
                  setJobToDelete(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setJobToDelete(null);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-md transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
  )
}

export default DeleteModal