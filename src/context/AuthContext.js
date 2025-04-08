import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (!accessToken || !client || !uid) {
      setUser(null);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/v1/auth/validate_token", {
        headers: {
          "access-token": accessToken,
          "client": client,
          "uid": uid,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      if (response.data && response.data.data) {
        setUser(response.data.data);  // Set user data after successful validation
      }
    } catch (error) {
      console.error('Error validating token:', error);
      // Handle invalid token or error
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      fetchUserData();  // Only fetch user data if there's a token
    }
  }, []);  // The empty dependency array ensures this only runs on mount

  return (
    <AuthContext.Provider value={{ user, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
