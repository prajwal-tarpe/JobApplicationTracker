import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import { editJobService } from '../../services/jobService';

function EditJobForm({job, onClose, onJobUpdate}) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    applicationDate: '',
    status: '',
    notes: '',
    jobLink: ''
  });

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        jobLink: job.jobLink,
        applicationDate: job.applicationDate?.split('T')[0],
        status: job.status,
        notes: job.notes,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { companyName, jobTitle, applicationDate, status, notes, jobLink } = formData;

    if (!companyName || !jobTitle || !applicationDate || !status || !notes || !jobLink) {
      handleError('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await editJobService( job._id, token, companyName, jobTitle, jobLink, applicationDate, status, notes);


      handleSuccess(response?.message);
      const updatedJob = response?.updatedJob || {
      ...job,
      companyName,
      jobTitle,
      jobLink,
      applicationDate,
      status,
      notes,
    };

    onJobUpdate(updatedJob);
      onClose();
    } catch (err) {
      if (err.response) {
        handleError(err.response.data.message || 'Unauthorized');
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/login');
      } else {
        handleError('Failed to update job');
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="relative bg-white/70 backdrop-blur-md border border-white/30 shadow-2xl rounded-xl p-6 w-full max-w-2xl mx-4">
        <button
          className="absolute top-3 right-4 text-gray-600 cursor-pointer text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Edit Job</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., Google"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g., Frontend Developer"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Application Date</label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g., Interview scheduled for 12th June"
              rows="2"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Link to Job Post or Resume</label>
            <input
              type="url"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              placeholder="https://example.com/job-post"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJobForm;