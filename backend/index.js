import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import bookingRouter from "./src/router/booking.router.js";
import seatRouter from "./src/router/seat.router.js";
import ConnectMongoDb from "./src/mongoConnection.js";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


app.get("/", (_, res) =>
  res.send({ message: "Server is working", success: true })
);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/seats", seatRouter);

ConnectMongoDb(app);

