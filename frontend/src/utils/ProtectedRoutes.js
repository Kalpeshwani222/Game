import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./localStorageOperations";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = isLoggedIn();
  return isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
