const router = require("express").Router();
const Razorpay = require("razorpay");
const Order = require("../models/Order");

//~getting api from backend server

router.get("/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZOR_PAY_KEY_ID });
});

//~creating order in razorpay
router.post("/create-order", async (req, res) => {
  //create instance of razorpay
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });
    //defining options
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };
    //connect to razor pay and create order for us.
    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Something went wrong");
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

//~creating pay order api

router.post("/pay-order", async (req, res) => {
  try {
    // read the details from request from frontend
    const {
      amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      fullname,
      country,
      mobileNumber,
      pincode,
      address,
      userId,
      products,
    } = req.body;

    //create a new order
    const newOrder = Order({
      amount: amount,
      products: products,
      deliveryDetails: {
        userId: userId,
        fullname: fullname,
        country: country,
        mobileNumber: mobileNumber,
        pincode: pincode,
        address: address,
      },
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();

    res.send({
      msg: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
