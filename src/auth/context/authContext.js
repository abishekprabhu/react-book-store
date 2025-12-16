import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(() => {
   const savedUser = sessionStorage.getItem("customerUser");
   return savedUser ? JSON.parse(savedUser) : null;
 });

 const login = (userData) => {
   setUser(userData);
   sessionStorage.setItem("customerUser", JSON.stringify(userData));
 };

 const logout = () => {
   setUser(null);
   sessionStorage.removeItem("customerUser");
 };

 const isAuthenticated = !!user;

 return (
   <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
     {children}
   </AuthContext.Provider>
 );
};