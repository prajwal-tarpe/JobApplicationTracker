import "./App.css";
import { Toaster } from "react-hot-toast";
import useJobActions from "./hooks/useJobActions";
import AppRoutes from "./AppRoutes";

function App() {
  const {
    jobs,
    jobStats,
    loading,
    setFilters,
    addJob,
    deleteJob,
    updateJob,
    deleteAllJobs,
    handleLoginSuccess,
  } = useJobActions();

  return (
    <>
      <div className="text-3xl font-bold text-center">
        <Toaster position="top-right" reverseOrder={false} />
        <AppRoutes
          jobs={jobs}
          jobStats={jobStats}
          loading={loading}
          addJob={addJob}
          deleteJob={deleteJob}
          updateJob={updateJob}
          setFilters={setFilters}
          deleteAllJobs={deleteAllJobs}
          handleLoginSuccess={handleLoginSuccess}
        />
      </div>
    </>
  );
}

export default App;