import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, AlertCircle, Check } from "lucide-react";
  import { ToastContainer, toast } from 'react-toastify';

const SeatBooking = () => {
  const [availableSeats, setAvailableSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const [totalSeats, setTotalSeats] = useState(0);
  const [bookedSeats, setBookedSeats] = useState(0);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);

  const token = localStorage.getItem("token");

  const fetchSeats = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://int-pre.onrender.com/api/auth/seat/available"
      );
      const seats = response.data.seats;
      setAvailableSeats(seats);
      setTotalSeats(seats.length);
      setBookedSeats(seats.filter((seat) => seat.isBooked).length);
      setAvailableSeatsCount(seats.filter((seat) => !seat.isBooked).length);
    } catch (error) {
      setMessage("Error fetching available seats.", error);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const handleBooking = async () => {
    if (!token) {
      setMessage("Please log in to book seats.");
      setMessageType("error");
      return;
    }

    setIsBooking(true);
    setMessage("");
    setMessageType("");

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
      setMessageType("success");
      await fetchSeats();
    } catch (error) {
      setMessage(
        "Error booking seats: " +
          (error.response?.data?.message || "Unknown error")
      );
      setMessageType("error");
    } finally {
      setIsBooking(false);
      toast.success(`Seats booked successfully! `);
    }
  };

  const handleResetAll = async () => {
    if (!token) {
      setMessage("Please log in as admin to reset seats.");
      setMessageType("error");
      return;
    }

    setIsResetting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await axios.post(  
        "https://int-pre.onrender.com/api/auth/seat/resetAll",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      setMessageType("success");
      await fetchSeats();
    } catch (error) {
      setMessage(
        "Error resetting seats: " +
          (error.response?.data?.message || "Unknown error")
      );
      setMessageType("error");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-900 py-12">
      <div className="container-custom">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Seat Booking</h1>
            <p className="mt-2 text-white">
              Select and book your preferred seats
            </p>
          </div>

          {message && (
            <div
              className={`mb-6 rounded-md p-4 ${
                messageType === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  {messageType === "success" ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-30 md:grid-cols-2 ml-32 mr-32">
            <div className="card">
              <h2 className="text-xl font-semibold text-white">
                Available Seats
              </h2>
              <p className="mt-1 text-sm text-white">
                Green seats are available, gray seats are booked
              </p>

              <div className="my-4 space-y-1">
                <p className="text-gray-200 font-bold text-lg">
                  Total Seats: {totalSeats}
                </p>
                <p className="text-green-400">
                  Available Seats: {availableSeatsCount}
                </p>
                <p className="text-red-400">Booked Seats: {bookedSeats}</p>
              </div>

              <div className="mt-8">
                {isLoading ? (
                  <div className="flex h-48 items-center justify-center">
                    <Loader className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : availableSeats.length === 0 ? (
                  <div className="flex h-48 items-center justify-center">
                    <p className="text-gray-500">No available seats</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
                    {availableSeats.map((seat, index) => (
                      <div
                        key={index}
                        className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                          seat.isBooked
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-green-300 text-green-800 hover:bg-green-400 hover:scale-105"
                        }`}
                      >
                        <span>{seat.seatNumber}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold text-white">
                Book Your Seats
              </h2>
              <p className="mt-1 text-sm text-white">
                Select how many seats you want to book
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="seat-count"
                    className="block text-sm font-medium text-white"
                  >
                    Select Seat Count:
                  </label>
                  <input
                    type="number"
                    id="seat-count"
                    value={seatCount}
                    min="1"
                    max="7"
                    onChange={(e) => setSeatCount(Number(e.target.value))}
                    className="mt-2 w-full rounded-md border text-white border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="rounded-xl px-6 py-3 text-white backdrop-blur-md bg-gradient-to-r from-green-400/30 to-green-600/30 border border-white/20 shadow-md hover:scale-105 transition-all duration-200 hover:shadow-lg hover:from-green-400/50 hover:to-green-600/50"
                  >
                    {isBooking ? (
                      <span className="flex items-center justify-center">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Booking...
                      </span>
                    ) : (
                      "Book Seats"
                    )}
                  </button>

                  <button
                    onClick={handleResetAll}
                    disabled={isResetting}
                    className="rounded-xl px-6 py-3 text-white backdrop-blur-md bg-gradient-to-r from-pink-400/30 to-red-500/30 border border-white/20 shadow-md hover:scale-105 transition-all duration-200 hover:shadow-lg hover:from-pink-400/50 hover:to-red-500/50"
                  >
                    {isResetting ? (
                      <span className="flex items-center justify-center">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </span>
                    ) : (
                      "Reset All Seats"
                    )}
                  </button>
                </div>
                <ToastContainer/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;
