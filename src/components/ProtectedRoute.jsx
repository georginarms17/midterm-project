import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  //gets user from AuthContext
  const { user } = useAuth();

  //if user does not exist, navigate to login page
  if (!user) return <Navigate to="/login" replace />;

  //renders routes within the protected route, which in this case the dashboard is wrapped in the protected route based on App.jsx
  return <Outlet />;
};

export default ProtectedRoute;