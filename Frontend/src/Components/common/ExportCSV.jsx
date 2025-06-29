import { CSVLink } from "react-csv";

function ExportCSV({ jobs }) {
  const headers = [
    { label: "Company", key: "companyName" },
    { label: "Job Title", key: "jobTitle" },
    { label: "Status", key: "status" },
    { label: "Date", key: "applicationDate" },
    { label: "Notes", key: "notes" },
    { label: "Job Link", key: "jobLink" },
  ];

  return (
    <CSVLink
      data={jobs}
      headers={headers}
      filename={"job_applications.csv"}
      className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xl hover:bg-blue-700 cursor-pointer"
    >
      Export as CSV
    </CSVLink>
  );
}

export default ExportCSV;