import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlinePlusCircle,
  HiOutlineCog,
} from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <HiOutlineHome />, route: "/home", title: "Dashboard" },
    { icon: <HiOutlineClipboardList />, route: "/jobs", title: "Jobs" },
    { icon: <HiOutlinePlusCircle />, route: "/add", title: "Add" },
    { icon: <HiOutlineCog />, route: "/setting", title: "Settings" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-16 bg-indigo-600 text-white flex flex-col items-center py-4 space-y-4 shadow-lg z-50">
      {navItems.map(({ icon, route, title }) => {
        const isActive = location.pathname === route;
        return (
          <button
            key={route}
            onClick={() => navigate(route)}
            title={title}
            className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-indigo-800 text-white"
                : "text-indigo-200 hover:text-white hover:bg-indigo-700"
            }`}
          >
            <div className="text-xl">{icon}</div>
          </button>
        );
      })}
    </div>
  );
}

export default Navigation;