import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SeatBooking.css";

const SeatBooking = () => {
  const [availableSeats, setAvailableSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get("https://int-pre.onrender.com/api/auth/seat/available");
        setAvailableSeats(response.data.seats);
      } catch (error) {
        setMessage("Error fetching available seats.", error);
      }
    };

    fetchSeats();
  }, []);

  const handleBooking = async () => {
    if (!token) {
      setMessage("Please log in to book seats.");
      return;
    }

    try {
      const response = await axios.post(
        "https://int-pre.onrender.com/api/auth/seat/book",
        { seatCount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error booking seats: " + error.response?.data?.message || "Unknown error");
    }
  };

  return (
    <div className="seat-booking-container">
      <div className="seat-display">
        <h2>Available Seats</h2>
        {availableSeats.length === 0 ? (
          <p>No available seats</p>
        ) : (
          availableSeats.map((seat, index) => (
            <div key={index} className="seat">
              <span>Row {seat.row}, Seat {seat.seatNumber}</span>
            </div>
          ))
        )}
      </div>

      <div className="seat-booking-form">
        <h2>Book Your Seats</h2>
        <div className="seat-count-container">
          <label htmlFor="seat-count">Select Seat Count:</label>
          <input
            type="number"
            id="seat-count"
            value={seatCount}
            min="1"
            max="7"
            onChange={(e) => setSeatCount(e.target.value)}
          />
        </div>
        <button onClick={handleBooking}>Book Seats</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SeatBooking;
