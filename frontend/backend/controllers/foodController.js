const Food = require("../models/Food");

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({ available: true }).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching foods" });
  }
};

// @desc    Get a single food by ID
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching food" });
  }
};

// @desc    Add a new food
// @route   POST /api/foods
// @access  Private/Admin
const addFood = async (req, res) => {
  const { name, description, price, image, category } = req.body;

  if (!name || !description || !price || !image) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const food = await Food.create({
      name,
      description,
      price: Number(price),
      image,
      category: category || "Other",
    });

    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding food" });
  }
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const { name, description, price, image, category, available } = req.body;

    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price !== undefined ? Number(price) : food.price;
    food.image = image || food.image;
    food.category = category || food.category;
    food.available = available !== undefined ? available : food.available;

    const updatedFood = await food.save();
    res.json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating food" });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    await food.deleteOne();
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting food" });
  }
};

module.exports = { getFoods, getFoodById, addFood, updateFood, deleteFood };
