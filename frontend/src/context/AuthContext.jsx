import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const APIEndPoint = "http://localhost:3000/api/v1/auth/me";
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      console.log("Calling /me...");
      const res = await axios.get(APIEndPoint, { withCredentials: true });
      console.log("User from backend:", res.data.user);
      setUser(res.data.user);
    } catch (error) {
      console.log("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
