import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      await api.post("/auth", {
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation,
        name: user.name
      });
  
      navigate("/login");
    } catch (err) {
      setError("Sign Up failed. Please try again.");
    }
  };
  

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="form-control mt-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="form-control mt-2"
          required
        />
        <input
          type="password_confirmation"
          name="password_confirmation"
          placeholder="Password Confirmation"
          value={user.password_confirmation}
          onChange={handleChange}
          className="form-control mt-2"
          required
        />
        <button type="submit" className="btn btn-success mt-3">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
