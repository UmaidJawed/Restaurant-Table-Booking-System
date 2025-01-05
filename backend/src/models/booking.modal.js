import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    date: { type: String, required: true }, 
    time: { type: String, required: true }, 
    guests: { type: Number, required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    seat: { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
