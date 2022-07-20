const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    deliveryDetails: {
      userId: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
      fullname: { type: String, required: true },
      mobileNumber: { type: String, required: true },
      address: { type: Object, required: true },
    },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },

    //razorpay details
    razorpay: {
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
