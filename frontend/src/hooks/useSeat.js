import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/seats";

const useSeat = () => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/fetch-all-seats`);
      setSeats(response.data.seats);
    } catch (err) {
      console.error("Error fetching seats:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const initializeSeats = async (seatNumbers) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/initialize-seats`, {
        seats: seatNumbers,
      });
      setSeats(response.data.seats);
    } catch (err) {
      console.error("Error initializing seats:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
    // initializeSeats([1, 2, 3, 4, 5, 6]);
  }, []);

  return {
    seats,
    loading,
    error,
    fetchSeats,
    initializeSeats,
  };
};

export default useSeat;
