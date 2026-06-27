const express = require("express");
const router = express.Router();
const {
  placeOrder,
  updateOrderStatus,
  paymentNotify,
  updatePaymentStatus,
  getMyOrders,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// POST /api/orders - Place a new order (Protected)
router.post("/", protect, placeOrder);

// POST /api/orders/payment/notify - PayHere payment notification webhook (Public)
router.post("/payment/notify", paymentNotify);

// GET /api/orders/my-orders - Get customer's own orders (Protected)
router.get("/my-orders", protect, getMyOrders);

// PUT /api/orders/:id - Update order status (Admin Only)
router.put("/:id", protect, adminOnly, updateOrderStatus);

// PUT /api/orders/:id/payment - Update payment status
router.put("/:id/payment", protect, updatePaymentStatus);

module.exports = router;
