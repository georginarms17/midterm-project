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
      <h2 className="text-[#004A3F] text-[30px] text-center font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="bg-white w-full border px-3 py-2 rounded"
        />
        <div>
          <button
            type="submit"
            className="bg-[#004A3F] px-4 py-2 text-white font-bold rounded-lg"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
