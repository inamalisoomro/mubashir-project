const express = require("express");
const router = express.Router();
const {
  getDashboard,
  getAllOrders,
  getAllCustomers,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/admin/dashboard
router.get("/dashboard", getDashboard);

// GET /api/admin/orders
router.get("/orders", getAllOrders);

// GET /api/admin/customers
router.get("/customers", getAllCustomers);

module.exports = router;
