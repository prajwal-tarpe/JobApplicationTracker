import { useState } from 'react';
import { handleError } from '../../utils';

const AddJobForm = ({ addJob }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    applicationDate: '',
    status: '',
    notes: '',
    jobLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { companyName, jobTitle, applicationDate, status, notes, jobLink } = formData;

    if (!companyName || !jobTitle || !applicationDate || !status || !notes || !jobLink) {
      handleError('All fields are required');
      return;
    }

    addJob(formData);
    setFormData({
      companyName: '',
      jobTitle: '',
      applicationDate: '',
      status: '',
      notes: '',
      jobLink: ''
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Job</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g., Google"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g., Frontend Developer"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g., Interview scheduled for 12th June"
            rows="3"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Link</label>
          <input
            type="url"
            name="jobLink"
            value={formData.jobLink}
            onChange={handleChange}
            placeholder="https://example.com/job-post"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;