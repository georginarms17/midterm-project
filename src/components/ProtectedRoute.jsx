import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // redirect to home (or login if you add a login page later)
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
