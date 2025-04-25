import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import TripDetails from "./components/TripDetails";
import CreateTrip from "./components/CreateTrip";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  // Apply dark theme class to body element
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Set dark mode in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        <InnerApp darkMode={darkMode} setDarkMode={setDarkMode} />
      </Router>
    </AuthProvider>
  );
};

const InnerApp = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
    <NavBar
      user={user}
      handleLogout={handleLogout}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
    <main className="p-4">
      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trips/:id" element={<TripDetails />} />
        <Route path="/trips/new" element={<CreateTrip />} />
      </Routes>
    </main>
    </>
  );
};

export default App;
