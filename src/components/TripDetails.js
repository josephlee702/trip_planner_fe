// src/pages/TripDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/${id}`, {
          headers: {
            "access-token": localStorage.getItem("access-token"),
            "client": localStorage.getItem("client"),
            "uid": localStorage.getItem("uid"),
          },
          withCredentials: true,
        });
        setTrip(response.data);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) return <p>Loading...</p>;

  return (
    <div>
      <h2>{trip.name}</h2>
      <p>{trip.start_date} – {trip.end_date}</p>
      <p>{trip.description}</p>
    </div>
  );
};

export default TripDetails;
