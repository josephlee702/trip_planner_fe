import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { fetchUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/sign_in", {
        email,
        password
      });
      
      // Store tokens in localStorage
      const { "access-token": accessToken, client, uid } = response.headers;
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("client", client);
      localStorage.setItem("uid", uid);

      fetchUserData();

      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mt-2"
          required
        />
        <button type="submit" className="btn btn-primary mt-3">Log In</button>
      </form>
    </div>
  );
};

export default Login;
