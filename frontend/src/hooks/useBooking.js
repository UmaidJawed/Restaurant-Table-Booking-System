import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/booking";

const useBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/fetch-all-bookings`);
      setBookings(response.data.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/fetch/${id}`);
      return response.data.booking;
    } catch (err) {
      console.error("Error fetching booking:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/create-booking`,
        bookingData
      );
      setBookings((prev) => [...prev, response.data.booking]);
    } catch (err) {
      console.error("Error creating booking:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/delete-booking/${id}`);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    fetchBookingById,
    createBooking,
    deleteBooking,
  };
};

export default useBooking;
