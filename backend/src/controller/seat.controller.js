import Seat from "../models/seat.model.js";

export const initializeSeats = async (req, res) => {
  try {
    const { seats } = req.body;

    const seatObjects = seats.map((seatNumber) => ({
      seatNumber,
      isBooked: false,
    }));

    await Seat.insertMany(seatObjects);

    res.status(201).json({ message: "Seats initialized successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const fetchAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json({ seats });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
