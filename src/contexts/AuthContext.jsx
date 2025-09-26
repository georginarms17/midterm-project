import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();                                                    //create context for AuthContext

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);                                //user -> currently logged in, null if not logged in
  const [allUsers, setAllUsers] = useLocalStorage("allUsers", {});                      //to keep track of all the users; allUsers will map { username: userId }

  const login = (name) => {
    let userId;
    if (allUsers[name]) {
      userId = allUsers[name];                                                          //existing user, reuse same ID
    } else {
      userId = "u_" + Date.now();                                                       //new user, create ID and save it
      setAllUsers((prev) => ({ ...prev, [name]: userId }));
    }

    const loggedInUser = { id: userId, name };
    setUser(loggedInUser);
  };

  const logout = () => setUser(null);                                                   //if user logs out, sets teh user state to null

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;         //allows access to value
};

export const useAuth = () => useContext(AuthContext);
