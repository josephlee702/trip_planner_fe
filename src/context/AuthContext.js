import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

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
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Error validating token:', error);
    }
  };

  // this fetch user data and sets user when the page is refreshed but user is logged in already
  useEffect(() => {
      fetchUserData();
  }, []); 

  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    setUser(null);
  }

  return (
    // this line lets the children of AuthProvider (like TripDetails.js) have access to user, fetchUserData, and logout through "useContext(AuthContext)"
    <AuthContext.Provider value={{ user, fetchUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
