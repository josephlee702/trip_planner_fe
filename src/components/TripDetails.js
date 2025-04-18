import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Collapse } from "react-bootstrap";

const TripDetails = () => {
  const { id } = useParams();
  const {user, fetchUserData} = useContext(AuthContext);
  const [trip, setTrip] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [dayData, setDayData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [openDayIds, setOpenDayIds] = useState({});

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
        setItineraries(response.data.itineraries || []);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    fetchTrip();
  }, [id, user, fetchUserData]);

  const handleInputChange = (e) => {
    setDayData({ ...dayData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await api.get(`/trips/${id}`);
        setTrip(response.data);
        setItineraries(response.data.itineraries);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };
  
    fetchTripDetails();
  }, [id]);
  

  const handleAddDay = async () => {
    try {
      const response = await api.post(
        `/trips/${trip.id}/itineraries`,
        {
          itinerary: {
            ...dayData,
            trip_id: trip.id,
            user_id: user.id,
          },
        },
        {
          headers: {
            "access-token": localStorage.getItem("access-token"),
            "client": localStorage.getItem("client"),
            "uid": localStorage.getItem("uid"),
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      setItineraries([...itineraries, response.data]);
      setDayData({
        name: "",
        start_date: "",
        end_date: "",
        description: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding itinerary:", error);
    }
  };

  const handleDeleteDay = async (dayId) => {
    try {
      await api.delete(`/trips/${trip.id}/itineraries/${dayId}`, {
        headers: {
          "access-token": localStorage.getItem("access-token"),
          "client": localStorage.getItem("client"),
          "uid": localStorage.getItem("uid"),
        },
        withCredentials: true,
      });
      setItineraries(itineraries.filter((day) => day.id !== dayId));
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  const toggleDay = (id) => {
    setOpenDayIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!trip) return <p>Loading...</p>;

  return (
    <div>
      <h2>{trip.name}</h2>
      <p><b>Dates:</b> {trip.start_date} – {trip.end_date}</p>
      <p><b>Destinations:</b> {trip.destinations.join(", ")}</p>

      <button className="btn btn-success my-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "➕ Add Day"}
      </button>

      {showForm && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5>Add a Day</h5>
          <input
            type="text"
            name="name"
            placeholder="Day Name"
            value={dayData.name}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="date"
            name="start_date"
            value={dayData.start_date}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="date"
            name="end_date"
            value={dayData.end_date}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={dayData.description}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <button className="btn btn-primary" onClick={handleAddDay}>
            Save Day
          </button>
        </div>
      )}

      <h4>Itinerary</h4>
      {Array.isArray(itineraries) && itineraries.length === 0 ? (
        <p>Add your first itinerary!</p>
      ) : (
        <div className="accordion">
          {Array.isArray(itineraries) && itineraries.map((day) => (
            <div key={day.id} className="card mb-2 shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-link text-start text-decoration-none"
                  onClick={() => toggleDay(day.id)}
                >
                  <strong>{day.name}</strong>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteDay(day.id)}
                >
                  🗑️ Delete
                </button>
              </div>
              <Collapse in={openDayIds[day.id]}>
                <div className="card-body">
                  <p><strong>Start:</strong> {day.start_date}</p>
                  <p><strong>End:</strong> {day.end_date}</p>
                  <p>{day.description}</p>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripDetails;
