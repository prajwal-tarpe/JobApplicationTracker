import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import JobsPage from "./Pages/JobsPage";
import AddJobForm from "./Components/job/AddJobForm";
import EditJobForm from "./Components/job/EditJobForm";
import Setting from "./Pages/Setting";
import NotFound from "./Pages/NotFound";
import PrivateRoute from "./Components/common/PrivateRoute";
import Layout from "./Components/layout/Layout";

const AppRoutes = ({
  jobs,
  jobStats,
  loading,
  addJob,
  deleteJob,
  updateJob,
  setFilters,
  deleteAllJobs,
  handleLoginSuccess,
}) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Layout>
              <Home jobStats={jobStats} loading={loading} />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/edit"
        element={
          <PrivateRoute>
            <Layout>
              <EditJobForm />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/add"
        element={
          <PrivateRoute>
            <Layout>
              <AddJobForm addJob={addJob} />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/setting"
        element={
          <PrivateRoute>
            <Layout>
              <Setting deleteAllJobs={deleteAllJobs} jobs={jobs} />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <PrivateRoute>
            <Layout>
              <JobsPage
                jobs={jobs}
                handleDeleteJob={deleteJob}
                handleJobUpdate={updateJob}
                setFilters={setFilters}
              />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;