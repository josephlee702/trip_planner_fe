import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

const NavBar = ({ handleLogout, darkMode, setDarkMode }) => {
  const { user } = useContext(AuthContext);
  return (
    <nav className="navbar d-flex flex-row justify-content-start p-2 bg-dark text-white">
      <Link to="/" className="ms-3">Home</Link>

      {user ? (
        <>
          <span className="ms-2">Welcome, {user.name}</span>
          <button onClick={handleLogout} className="btn btn-primary rounded-pill ms-2">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="ms-2">Log In</Link>
          <Link to="/signup" className="ms-2">Sign Up</Link>
        </>
      )}

      <div className="ms-auto">
        <button onClick={() => setDarkMode(!darkMode)} className="btn btn-primary">
        {darkMode ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
