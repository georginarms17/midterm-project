import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [allUsers, setAllUsers] = useLocalStorage("allUsers", {});
  // allUsers will map { username: userId }

  const login = (name) => {
    let userId;
    if (allUsers[name]) {
      // Existing user, reuse same ID
      userId = allUsers[name];
    } else {
      // New user, create ID and save it
      userId = "u_" + Date.now();
      setAllUsers((prev) => ({ ...prev, [name]: userId }));
    }

    const loggedInUser = { id: userId, name };
    setUser(loggedInUser);
  };

  const logout = () => setUser(null);

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
