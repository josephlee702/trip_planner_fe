import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // We are now consuming the user context and logout function
  const { user, logout } = useContext(AuthContext); 

  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  // Apply dark theme class to body element
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Set dark mode in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Handle logout
  const handleLogout = () => {
    logout(); // Calling the logout function from AuthContext
    window.location.reload();
  };

  return (
    <AuthProvider>
      <Router>
        {/* Pass the user and handleLogout to NavBar */}
        <NavBar user={user} handleLogout={handleLogout} darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage darkMode={darkMode} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
