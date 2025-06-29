// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-2">Oops! Page not found</p>
      <p className="text-sm text-gray-500 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;