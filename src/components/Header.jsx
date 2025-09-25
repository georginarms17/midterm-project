import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Study Spot Booker
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/dashboard">My Bookings</Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-slate-700">
                Hi, <strong>{user.name}</strong>
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
