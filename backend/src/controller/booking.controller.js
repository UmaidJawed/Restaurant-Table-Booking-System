import Booking from "../models/booking.modal.js";
import Seat from "../models/seat.model.js";

export const createBooking = async (req, res) => {
  try {
    const { date, time, guests, name, contact, seatNumber } = req.body;

    if (!date || !time || !guests || !name || !contact || !seatNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const seat = await Seat.findOne({ seatNumber });

    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    if (seat.isBooked) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    const newBooking = new Booking({
      date,
      time,
      guests,
      name,
      contact,
      seat: seat._id,
    });
    await newBooking.save();

    seat.isBooked = true;
    seat.bookingId = newBooking._id;
    await seat.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const seat = await Seat.findById(booking.seat);
    if (seat) {
      seat.isBooked = false;
      seat.bookingId = null;
      await seat.save();
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const fetchAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("seat");
    res.status(200).json({ bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export const fetchSingleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("seat");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
