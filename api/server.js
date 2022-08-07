import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import resRoute from "./routes/res.js";
// import menuRoute from "./routes/menu.js";

const app = express();
dotenv.config();
//~Db connection

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connected successfully"))
    .catch((err) => {
      throw err;
    });
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//* middlewares;
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/res", resRoute);
// app.use("/api/menu", menuRoute);

app.use((err, req, res, next) => {
  //follow the same order of parameters
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack, //gives extra information abt err
  });
});

app.listen(process.env.PORT || 8000, () => {
  connect();
  console.log("server is running on port 8000");
});
