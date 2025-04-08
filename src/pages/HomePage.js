import React, { useEffect, useState, useContext } from "react";
import api from "../services/api"; 
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = ({ darkMode }) => {
  const {user} = useContext(AuthContext);
  // const [portfolios, setPortfolios] = useState([]);

  // useEffect(() => {
  //   const fetchPortfolios = async () => {  
  //     try {
  //       const response = await api.get("/portfolios", {
  //         headers: {
  //           "access-token": localStorage.getItem("access-token"),
  //           "client": localStorage.getItem("client"),
  //           "uid": localStorage.getItem("uid"),
  //           "Content-Type": "application/json",
  //           "Accept": "application/json",
  //         },
  //         withCredentials: true,
  //       });
  //       setPortfolios(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching portfolios:", error);
  //     }
  //   };
  //   fetchPortfolios();
  // }, [user]);
  

  return (
    <div className="container mt-4">
      <h1 className={`display-4 ${darkMode ? "text-light" : "text-dark"}`}> Your Trips</h1>
    </div>)
};

export default HomePage;
