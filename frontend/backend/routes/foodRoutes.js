const express = require("express");
const router = express.Router();
const {
  getFoods,
  getFoodById,
  addFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/foods - Public
router.get("/", getFoods);

// GET /api/foods/:id - Public
router.get("/:id", getFoodById);

// POST /api/foods - Admin Only
router.post("/", addFood);

// PUT /api/foods/:id - Admin Only
router.put("/:id", updateFood);

// DELETE /api/foods/:id - Admin Only
router.delete("/:id", deleteFood);

module.exports = router;
