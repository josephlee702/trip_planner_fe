import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateTrip = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/trips",
        {
          trip: {
            name,
            start_date: startDate,
            end_date: endDate,
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
      navigate("/"); // redirect back to homepage after success
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create a New Trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Trip Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Trip
        </button>
      </form>
    </div>
  );
};

export default CreateTrip;
