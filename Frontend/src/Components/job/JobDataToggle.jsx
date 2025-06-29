import { MdTableChart, MdViewModule } from "react-icons/md";

function JobDataToggle({ setTableView, tableView }) {
  const buttonClass = (active) =>
    `px-3 py-1.5 rounded-md flex items-center justify-center text-base cursor-pointer transition-all duration-150
    ${active
      ? "bg-gray-200 text-gray-800 font-semibold shadow-inner"
      : "text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg w-fit border border-gray-300">
      <button
        onClick={() => setTableView(true)}
        className={buttonClass(tableView)}
        title="Table View"
      >
        <MdTableChart className="text-lg" />
      </button>
      <button
        onClick={() => setTableView(false)}
        className={buttonClass(!tableView)}
        title="Card View"
      >
        <MdViewModule className="text-lg" />
      </button>
    </div>
  );
}

export default JobDataToggle;