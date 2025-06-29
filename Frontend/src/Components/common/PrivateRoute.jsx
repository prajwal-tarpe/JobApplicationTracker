import React from "react";
import { Navigate } from "react-router-dom";
import { handleError } from "../../utils";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    handleError("Please Login or Signup...");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
