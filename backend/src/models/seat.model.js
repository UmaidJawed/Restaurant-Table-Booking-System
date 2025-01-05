import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true, unique: true }, // Example: "A1", "B2"
    isBooked: { type: Boolean, default: false },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", default: null }
}, { timestamps: true });

const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
