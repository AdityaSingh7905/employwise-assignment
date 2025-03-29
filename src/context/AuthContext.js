import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
  token: null,
  users: [],
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [users, setUsers] = useState([]);

  const API_BASE_URL = "https://reqres.in/api/users";

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.data);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AuthContext.Provider value={{ token, users, setToken, setUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
