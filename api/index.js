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
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
// header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

//middlewares

app.use(cookieParser());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });
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
