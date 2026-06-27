# Food Ordering System - Master Context Plan (MCP)

## Project Information

**Project:** Food Ordering System

**Frontend:** React.js

**Backend:** Node.js + Express.js

**Database:** MongoDB (Mongoose)

**Authentication:** JWT + bcrypt

**Payment Gateway:** PayHere Sandbox

---

# Objective

Develop a complete Food Ordering System with two roles:

1. Customer
2. Admin

The application should allow customers to browse food, place orders, and make payments, while administrators manage foods, customers, and orders.

---

# Frontend Progress

## Completed Pages

### Home

- Home page created
- Blog/demo content added

Status:
✔ Completed

---

### Register

Features

- Name
- Email
- Password
- Sends data to backend

API

POST /api/auth/register

Status

✔ Completed

---

### Login

Features

- Email
- Password
- JWT Login
- Save token
- Save user
- Redirect Home

API

POST /api/auth/login

Status

✔ Completed

---

### Food Menu

Features

- Fetch foods from backend
- Display food cards
- Add to Cart
- Store cart in localStorage

API

GET /api/foods

Status

✔ Completed

---

### Cart

Features

- View Cart
- Increase Quantity
- Decrease Quantity
- Remove Item
- Total Price
- Checkout Button

Status

✔ Completed

---

### Checkout

Features

- Customer Details
- Order Summary
- Total
- Place Order

API

POST /api/orders

Status

✔ Completed

---

### Order Success

Features

- Success Message
- Payment Status
- Return Home
- Continue Shopping

Status

✔ Completed

---

# Admin Pages

## Dashboard

Features

- Total Customers
- Total Foods
- Total Orders
- Total Revenue

API

GET /api/admin/dashboard

Status

✔ Completed

---

## Food Management

Features

- Add Food
- View Foods
- Delete Food

APIs

GET /api/foods

POST /api/foods

DELETE /api/foods/:id

Status

✔ Completed

---

## Orders

Features

- View Orders
- Update Status

Statuses

Preparing

Out for Delivery

Delivered

APIs

GET /api/admin/orders

PUT /api/orders/:id

Status

✔ Completed

---

## Customers

Features

- View Customers

API

GET /api/admin/customers

Status

✔ Completed

---

# Components

## Navbar

✔ Completed

Contains

- Home
- Menu
- Cart
- Login
- Register
- Logout

---

## Footer

✔ Completed

---

## FoodCard

✔ Completed

Reusable component for displaying food.

---

## ProtectedRoute

✔ Completed

Protects authenticated pages using JWT token.

---

# Configuration

## api.js

✔ Completed

Stores backend API URL.

---

## App.jsx

✔ Completed

Contains all routes.

---

## main.jsx

✔ Completed

React entry point.

---

## index.css

✔ Completed

Basic responsive styling.

---

# Backend (Still To Do)

Create the following folders.

```
server/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── foodController.js
│   ├── orderController.js
│   └── adminController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Food.js
│   ├── Order.js
│   └── Payment.js
│
├── routes/
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
│
├── app.js
├── server.js
└── .env
```

---

# MongoDB Models

## User

Fields

- name
- email
- password
- phone
- role

---

## Food

Fields

- name
- description
- price
- image

---

## Order

Fields

- customer
- items
- total
- paymentStatus
- orderStatus
- address
- phone

---

## Payment

Fields

- orderId
- amount
- paymentId
- status

---

# Authentication

Need to implement

- JWT Token
- bcrypt Password Hashing
- Login Middleware
- Admin Middleware

---

# APIs To Build

## Authentication

POST /api/auth/register

POST /api/auth/login

---

## Foods

GET /api/foods

POST /api/foods

PUT /api/foods/:id

DELETE /api/foods/:id

---

## Orders

POST /api/orders

GET /api/admin/orders

PUT /api/orders/:id

---

## Dashboard

GET /api/admin/dashboard

---

## Customers

GET /api/admin/customers

---

# Database Connection

Install

npm install mongoose

Create

config/db.js

Connect MongoDB

Call connectDB() inside server.js

---

# Packages To Install

Backend

npm install

express

mongoose

cors

dotenv

bcryptjs

jsonwebtoken

nodemon

Frontend

npm install

react-router-dom

---

# Payment Gateway

Need to implement

PayHere Sandbox

Flow

Checkout

↓

Create Order

↓

Redirect to PayHere

↓

Payment Success

↓

Update Payment Status

↓

Show Order Success Page

---

# Optional Improvements

- Edit Food
- Food Categories
- Search Foods
- Pagination
- Upload Images
- Order History
- User Profile
- Better UI
- Toast Notifications
- Loading Spinner

---

# Testing Checklist

Customer

☐ Register

☐ Login

☐ View Foods

☐ Add To Cart

☐ Checkout

☐ Payment

☐ Order Success

Admin

☐ Login

☐ Dashboard

☐ Add Food

☐ Delete Food

☐ View Orders

☐ Update Status

☐ View Customers

---

# Submission Checklist

☑ React Frontend

☑ Responsive UI

☐ Node.js Backend

☐ MongoDB Database

☐ JWT Authentication

☐ PayHere Sandbox

☐ GitHub Repository

☐ Demo Video

---

# Current Completion Estimate

Frontend: 95%

Backend: 0%

Overall Project: ~50%

Once the backend, MongoDB integration, JWT authentication, and PayHere payment are implemented and tested, the project will be ready for submission.