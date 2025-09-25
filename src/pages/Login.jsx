import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a name");
    login(name.trim());
    navigate("/dashboard/my-bookings");
  };

  if (user) return <div>You are already logged in as {user.name}.</div>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login / Demo account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border px-3 py-2 rounded"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              login("Demo User");
              navigate("/dashboard/my-bookings");
            }}
            className="px-4 py-2 border rounded"
          >
            Sign in as Demo User
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
