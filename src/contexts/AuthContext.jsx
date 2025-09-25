import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Persist user between refreshes
  const [user, setUser] = useLocalStorage("user", null);

  // Simulated login - no backend in this course project
  const login = (name) => {
    const fakeUser = { id: "u_" + Date.now(), name };
    setUser(fakeUser);
  };

  const logout = () => setUser(null);

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
