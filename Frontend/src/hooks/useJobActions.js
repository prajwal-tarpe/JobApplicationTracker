import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addJobsService,
  fetchJobsService,
  deleteJobService,
  fetchJobsStatusService,
  deleteAllJobService,
} from "../services/jobService";
import { handleSuccess, handleError } from "../utils";

const useJobActions = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    sortOrder: "desc",
    search: "",
  });
  const [jobStats, setJobStats] = useState({});

  const addJob = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleError("Unauthorized Please Login...!");
      navigate("/login");
      return;
    }
    try {
      const response = await addJobsService(data, token);
      handleSuccess(response?.message);
      setJobs(response.data);
      setLoading(false);
      navigate("/jobs");
    } catch (err) {
      if (err.response) {
        handleError(err.response.data.message || "Unauthorized");
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
      } else {
        handleError("Failed to add expense");
      }
    }
  };

  const fetchJobs = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      handleError("Unauthorized. Please login.");
      navigate("/login");
      return;
    }
    try {
      const res = await fetchJobsService(filters, token);
      setJobs(res.data);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        handleError(error.response.data.message || "Session expired");
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
      } else {
        handleError("Failed to fetch jobs");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchJobs();
    }
  }, [filters]);

  const deleteJob = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleError("Unauthorized Please Login....");
      navigate("/login");
      return;
    }
    try {
      const response = await deleteJobService(jobId, token);
      handleSuccess(response?.message);
      setJobs(response.data);
    } catch (error) {
      if (error.response) {
        handleError(error.response.data.message || "Unauthorized");
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("loggedInUser");
          navigate("/login");
        }
      } else {
        handleError("Failed to delete expense");
      }
    }
  };

  const updateJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
    );
  };

  const fetchJobStats = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetchJobsStatusService(token);
      if (res.success) {
        setJobStats(res.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        handleError(error.response.data.message || "Session expired");
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
      } else {
        handleError("Failed to fetch jobs");
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchJobStats();
    }
  }, [jobs]);

  const deleteAllJobs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleError("Unauthorized Please Login....");
      navigate("/login");
      return;
    }

    try {
      const response = await deleteAllJobService(token);
      handleSuccess(response?.message || "All jobs deleted successfully");
      setJobs([]);
    } catch (error) {
      if (error.response) {
        handleError(error.response.data.message || "Unauthorized");
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("loggedInUser");
          navigate("/login");
        }
      } else {
        handleError("Failed to delete all jobs");
      }
    }
  };

  const handleLoginSuccess = () => {
    fetchJobs();
    fetchJobStats();
  };

  return {
    jobs,
    jobStats,
    loading,
    filters,
    setFilters,
    addJob,
    fetchJobs,
    deleteJob,
    updateJob,
    fetchJobStats,
    deleteAllJobs,
    handleLoginSuccess,
  };
};

export default useJobActions;