import { Router } from "express";
import { initializeSeats, fetchAllSeats } from "../controller/seat.controller.js";

const seatRouter = Router();

seatRouter.post("/initialize-seats", initializeSeats);
seatRouter.get("/fetch-all-seats", fetchAllSeats);

export default seatRouter;
