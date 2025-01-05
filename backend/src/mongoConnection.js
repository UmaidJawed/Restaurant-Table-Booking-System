import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export default async function ConnectMongoDb(app) {
  const MONGO_URL =
    process.env.MONGO_CONNECTION_STRING ||
    "mongodb+srv://raj:Hraj12345@cluster0.rqs2n3l.mongodb.net/course-db";
  const PORT = process.env.PORT || 8000;
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `Mongo DB Connected with ${MONGO_URL}\nExpress Server running on ${PORT}`
        );
      });
    })
    .catch(console.error);
}
