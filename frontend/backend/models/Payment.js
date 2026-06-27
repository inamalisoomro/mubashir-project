const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Cancelled"],
      default: "Pending",
    },
    currency: {
      type: String,
      default: "LKR",
    },
    paymentMethod: {
      type: String,
      default: "PayHere",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
