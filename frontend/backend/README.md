# Food Ordering System - Backend

Node.js + Express + MongoDB REST API for the Food Ordering System.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
cd backend
npm install
```

### Configuration

Edit the `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/food-ordering-db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PAYHERE_MERCHANT_ID=1211149
PAYHERE_MERCHANT_SECRET=your_payhere_secret_here
```

### Seed the Database (First Time)

```bash
node seed.js
```

This creates:
- **Admin**: `admin@foodorder.com` / `admin123`
- **Customer**: `customer@foodorder.com` / `customer123`
- 8 sample food items

### Run the Server

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## 📋 API Endpoints

### Authentication
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new customer |
| POST | `/api/auth/login` | Login (returns JWT token) |

### Foods
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/foods` | Get all foods (public) |
| GET | `/api/foods/:id` | Get single food |
| POST | `/api/foods` | Add food (admin) |
| PUT | `/api/foods/:id` | Update food (admin) |
| DELETE | `/api/foods/:id` | Delete food (admin) |

### Orders
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/orders` | Place an order (requires JWT) |
| GET | `/api/orders/my-orders` | Get my orders (requires JWT) |
| PUT | `/api/orders/:id` | Update order status (admin) |
| PUT | `/api/orders/:id/payment` | Update payment status |
| POST | `/api/orders/payment/notify` | PayHere webhook (public) |

### Admin
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/orders` | All orders |
| GET | `/api/admin/customers` | All customers |

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Register & Login
│   ├── foodController.js  # Food CRUD
│   ├── orderController.js # Orders + PayHere
│   └── adminController.js # Admin stats
├── middleware/
│   └── authMiddleware.js  # JWT + Admin guard
├── models/
│   ├── User.js
│   ├── Food.js
│   ├── Order.js
│   └── Payment.js
├── routes/
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
├── app.js                 # Express app setup
├── server.js              # Entry point
├── seed.js                # Database seeder
└── .env                   # Environment variables
```

---

## 💳 PayHere Sandbox

The backend includes a PayHere Sandbox webhook at `POST /api/orders/payment/notify`.

- PayHere will call this URL after payment
- The endpoint verifies the MD5 signature
- Updates order `paymentStatus` to `Paid` or `Failed`

**Sandbox Merchant ID:** `1211149`

Get your sandbox credentials at: https://sandbox.payhere.lk
