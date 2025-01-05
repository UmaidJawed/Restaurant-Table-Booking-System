import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  fetchAllBookings,
  fetchSingleBooking,
} from "../controller/booking.controller.js";

const bookingRouter = Router();

bookingRouter.post("/create-booking", createBooking);
bookingRouter.delete("/delete-booking/:id", deleteBooking);
bookingRouter.get("/fetch-all-bookings", fetchAllBookings);
bookingRouter.get("/fetch/:id", fetchSingleBooking);

export default bookingRouter;
