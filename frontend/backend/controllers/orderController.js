const Order = require("../models/Order");
const Payment = require("../models/Payment");
const crypto = require("crypto");

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private (customer)
const placeOrder = async (req, res) => {
  const { name, phone, address, items, total } = req.body;

  if (!name || !phone || !address || !items || items.length === 0 || !total) {
    return res.status(400).json({ message: "Please provide all required order details" });
  }

  try {
    const order = await Order.create({
      customer: req.user ? req.user._id : null,
      name,
      phone,
      address,
      items,
      total: Number(total),
      paymentStatus: "Pending",
      status: "Pending",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order" });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const validStatuses = ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
};

// @desc    PayHere payment notification (webhook)
// @route   POST /api/orders/payment/notify
// @access  Public (called by PayHere)
const paymentNotify = async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;

    // Verify MD5 signature from PayHere
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
    const hashedSecret = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase();

    const localSig = crypto
      .createHash("md5")
      .update(
        merchant_id +
          order_id +
          payhere_amount +
          payhere_currency +
          status_code +
          hashedSecret
      )
      .digest("hex")
      .toUpperCase();

    if (localSig !== md5sig) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // status_code 2 = Success, 0 = Pending, -1 = Cancelled, -2 = Failed, -3 = Chargedback
    if (status_code === "2") {
      order.paymentStatus = "Paid";
      order.paymentId = payment_id;
      await order.save();

      // Save payment record
      await Payment.create({
        orderId: order._id,
        amount: parseFloat(payhere_amount),
        paymentId: payment_id,
        status: "Success",
        currency: payhere_currency,
      });
    } else if (status_code === "-1" || status_code === "-2") {
      order.paymentStatus = "Failed";
      await order.save();

      await Payment.create({
        orderId: order._id,
        amount: parseFloat(payhere_amount),
        paymentId: payment_id || "N/A",
        status: "Failed",
        currency: payhere_currency,
      });
    }

    res.send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment notification error" });
  }
};

// @desc    Update payment status after PayHere redirect (return URL)
// @route   PUT /api/orders/:id/payment
// @access  Private
const updatePaymentStatus = async (req, res) => {
  const { paymentStatus, paymentId } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = paymentStatus || order.paymentStatus;
    order.paymentId = paymentId || order.paymentId;
    await order.save();

    res.json({ message: "Payment status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating payment status" });
  }
};

// @desc    Get orders for logged-in customer
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching your orders" });
  }
};

module.exports = {
  placeOrder,
  updateOrderStatus,
  paymentNotify,
  updatePaymentStatus,
  getMyOrders,
};
