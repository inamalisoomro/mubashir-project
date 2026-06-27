/**
 * Seed Script - Run this once to populate the database with:
 * - An admin user
 * - Sample food items
 *
 * Usage: node seed.js
 */

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Food = require("./models/Food");

const seedData = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting database seed...");

    // ── Clear existing data ──────────────────────────────────────────────────
    await User.deleteMany({});
    await Food.deleteMany({});
    console.log("🗑️  Cleared existing users and foods");

    // ── Create Admin User ────────────────────────────────────────────────────
    const admin = await User.create({
      name: "Admin",
      email: "admin@foodorder.com",
      password: "admin123",
      phone: "+94 77 123 4567",
      role: "admin",
    });
    console.log(`✅ Admin created: ${admin.email} / password: admin123`);

    // ── Create Sample Customer ───────────────────────────────────────────────
    const customer = await User.create({
      name: "John Doe",
      email: "customer@foodorder.com",
      password: "customer123",
      phone: "+94 71 987 6543",
      role: "customer",
    });
    console.log(`✅ Customer created: ${customer.email} / password: customer123`);

    // ── Create Sample Foods ──────────────────────────────────────────────────
    const foods = await Food.insertMany([
      {
        name: "Margherita Pizza",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil on a crispy crust.",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
        category: "Pizza",
      },
      {
        name: "BBQ Chicken Pizza",
        description: "Smoky BBQ sauce, grilled chicken, red onions, and melted cheddar cheese.",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        category: "Pizza",
      },
      {
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with cheddar cheese, lettuce, tomato, onion, and pickles.",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        category: "Burger",
      },
      {
        name: "Double Smash Burger",
        description: "Two smashed beef patties, American cheese, special sauce, and crispy fries.",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400",
        category: "Burger",
      },
      {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
        category: "Cake",
      },
      {
        name: "Strawberry Cheesecake",
        description: "Creamy New York style cheesecake topped with fresh strawberry compote.",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
        category: "Cake",
      },
      {
        name: "Crispy Fried Chicken",
        description: "Golden fried chicken with a crispy coating, served with coleslaw and fries.",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400",
        category: "Chicken",
      },
      {
        name: "Grilled Salmon",
        description: "Atlantic salmon fillet grilled to perfection with lemon butter sauce and veggies.",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
        category: "Seafood",
      },
    ]);

    console.log(`✅ ${foods.length} food items created`);
    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📋 Test Credentials:");
    console.log("   Admin  → admin@foodorder.com / admin123");
    console.log("   Customer → customer@foodorder.com / customer123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error);
    process.exit(1);
  }
};

seedData();
