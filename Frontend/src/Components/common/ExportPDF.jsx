import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ jobs }) {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Job Applications", 14, 15);

    const tableColumn = ["Company", "Job Title", "Status", "Date", "Notes"];
    const tableRows = jobs.map(job => [
      job.companyName,
      job.jobTitle,
      job.status,
      new Date(job.applicationDate).toLocaleDateString(),
      job.notes || "—",
    ]);

    autoTable(doc,{
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("job_applications.pdf");
  };

  return (
    <button
      onClick={exportToPDF}
      className="bg-red-600 text-white px-3 py-1.5 rounded-md text-xl hover:bg-red-700 ml-2 cursor-pointer"
    >
      Export as PDF
    </button>
  );
}

export default ExportPDF;