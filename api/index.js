const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/razorpay");
const cors = require("cors");

//~Db connection
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull !"))
    .catch((err) => {
      throw err;
    });
};

//if it disconnects, it will reconnect
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//~routes
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/orders", paymentRoute);

//HANDLE ERRORS

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

app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log("Backend server is running !");
});
