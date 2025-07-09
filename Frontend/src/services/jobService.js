import axios from 'axios';

const API_URL = 'https://job-applications-tracker-api.vercel.app/jobs';

export const fetchJobsService = async (filters, token) => {
  const query = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_URL}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addJobsService = async ( data, token) => {
    const response = await axios.post(API_URL,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
}

export const deleteJobService = async (jobId, token) => {
  const response = await axios.delete(`${API_URL}/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const editJobService = async (jobId, token, company, jobTitle, jobLink, appliedDate, status, notes) => {
      const response = await axios.put(`${API_URL}/${jobId}`, {
        companyName: company,
        jobTitle,
        jobLink,
        applicationDate: appliedDate,
        status,
        notes,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
};

export const fetchJobsStatusService = async (token) => {
    const response = await axios.get(`${API_URL}/stats`,{
        headers: {Authorization: `Bearer ${token}`},
      });
    
      return response.data;
}

export const deleteAllJobService = async (token) => {
  const response = await axios.delete(`${API_URL}/deleteAll`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
}
