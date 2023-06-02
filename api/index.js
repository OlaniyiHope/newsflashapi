import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "../routes/auth.js";
import usersRoute from "../routes/users.js";
import propertiesRoute from "../routes/properties.js";
import categoriesRoute from "../routes/categories.js";
import roomsRoute from "../routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Connected to vercel app.");
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB has disconnected!");
});

//middlewares

app.use(cookieParser());
app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:5000",
  }
));
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/properties", propertiesRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/categories", categoriesRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log("Connected to backend.");
});
export default app;
