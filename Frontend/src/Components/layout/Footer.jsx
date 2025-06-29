import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200">
        
        <div className="mb-2 sm:mb-0 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} JobTrackr. All rights reserved.</p>
        </div>
        
        <div className="flex space-x-4">
          <div onClick={() => navigate("/home")} className="hover:text-gray-800 transition cursor-pointer">Home</div>
          <div onClick={() => navigate("/jobs")} href="/dashboard" className="hover:text-gray-800 transition cursor-pointer">Jobs</div>
          <div onClick={() => navigate("/add")} href="/dashboard" className="hover:text-gray-800 transition cursor-pointer">add</div>
          <div onClick={() => navigate("/setting")} href="/settings" className="hover:text-gray-800 transition cursor-pointer">Settings</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
