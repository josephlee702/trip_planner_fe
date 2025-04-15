import React, { useEffect, useState, useContext } from "react";
import api from "../services/api"; 
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = ({ darkMode }) => {
  const {user} = useContext(AuthContext);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {  
      try {
        const response = await api.get("/trips", {
          headers: {
            "access-token": localStorage.getItem("access-token"),
            "client": localStorage.getItem("client"),
            "uid": localStorage.getItem("uid"),
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          withCredentials: true,
        });
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    if (user) {
      fetchTrips();
    }
  }, [user]);
  

  return (
    <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1 className={`display-4 ${darkMode ? "text-light" : "text-dark"}`}>
        Your Trips
      </h1>
      {user ? (
          <Link to="/trips/new" className="btn btn-success">
            + Create Trip
          </Link>
        ) : (
          <p className={darkMode ? "text-light" : "text-dark"}>
          </p>
        )}
      </div>
      
      {trips.length === 0 ? (
        <p className={darkMode ? "text-light" : "text-dark"}>
        {user ? "You don't have any trips yet." : "Please log in to view your trips."}
        </p>
      ) : (
        <div className="row mt-4">
          {trips.map((trip) => (
            <div key={trip.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{trip.name}</h5>
                  <p className="card-text">
                    {trip.start_date} – {trip.end_date}
                  </p>
                  <Link to={`/trips/${trip.id}`} className="btn btn-primary">
                    View Itinerary
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
