import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();                                                             //gets user from AuthContext

  return (
    <header className="bg-[#FFDBDB] shadow mb-2">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-[#004A3F] text-2xl font-bold">
          StudySpot
        </Link>
        <nav className="text-[#004A3F]flex items-center space-x-4">
          <NavLink to="/">Home</NavLink>
          {user && <NavLink to="/dashboard/my-bookings">My Bookings</NavLink>}
          {!user ? (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-[#004A3F] font-bold text-white rounded-lg"
            >
              Login
            </NavLink>
          ) : (
            <>
              <span className="px-3">Hi, {user.name}</span>
              <button onClick={logout} className="text-white font-bold bg-red-500 px-3 py-1 border rounded-xl">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
