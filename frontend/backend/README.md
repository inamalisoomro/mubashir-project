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



Food Ordering System — Complete Startup Guide
For First-Time Setup (Beginner Friendly)
📋 What You Need to Install First
Before running the project, you need 3 things installed on your computer.

✅ Step 1 — Install Node.js
Node.js is required to run both the frontend and backend.

Go to https://nodejs.org
Download the LTS version (the green button)
Run the installer — click Next through everything
When done, open PowerShell or Command Prompt and type:
bash

node --version
You should see something like v20.x.x — that means it worked! ✅

✅ Step 2 — Install MongoDB
MongoDB is the database where all your data (users, foods, orders) is stored.

Go to https://www.mongodb.com/try/download/community
Choose Windows → MSI → click Download
Run the installer:
Choose Complete setup
✅ Check "Install MongoDB as a Service" — this is important!
✅ Check "Install MongoDB Compass" (this is a visual tool to see your database)
Click Install and wait
When done, MongoDB will automatically run in the background every time your PC starts. ✅

To verify MongoDB is running: Open Task Manager → Services tab → look for MongoDB with status Running

✅ Step 3 — Verify npm is installed
npm comes with Node.js automatically. To verify, open PowerShell and type:

bash

npm --version
You should see a version number like 10.x.x ✅

🚀 Running the Project
Your project has two parts that both need to run at the same time:

Part	Folder	Port
Backend (Node.js API)	backend/	http://localhost:5000
Frontend (React UI)	frontend/frontend/	http://localhost:5173
You will need to open 2 PowerShell/Terminal windows — one for each.

🖥️ Window 1 — Start the Backend
First time only — Seed the database
Open PowerShell and navigate to the backend folder:

powershell

cd "C:\Users\INAM ALI SOOMRO\Desktop\New folder (3)\mubashir-project\frontend\backend"
Then run the seed script to add the admin account and sample foods:

powershell

node seed.js
You should see this output:


✅ MongoDB Connected: localhost
🌱 Starting database seed...
🗑️  Cleared existing users and foods
✅ Admin created: admin@foodorder.com / password: admin123
✅ Customer created: customer@foodorder.com / password: customer123
✅ 8 food items created
🎉 Database seeded successfully!
📋 Test Credentials:
   Admin    → admin@foodorder.com / admin123
   Customer → customer@foodorder.com / customer123
⚠️ Only run node seed.js once. If you run it again, it will delete and re-create all data.

Start the backend server
powershell

npm run dev
You should see:


✅ MongoDB Connected: localhost
🚀 Server running on http://localhost:5000
📦 Environment: development
✅ Leave this window open and running!

🌐 Window 2 — Start the Frontend
Open a second PowerShell window and navigate to the frontend folder:

powershell

cd "C:\Users\INAM ALI SOOMRO\Desktop\New folder (3)\mubashir-project\frontend\frontend"
Install frontend packages (first time only):

powershell

npm install
Then start the frontend:

powershell

npm run dev
You should see:


  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
Now open your browser and go to: http://localhost:5173 🎉

🔐 Test Accounts
Role	Email	Password
Admin	
admin@foodorder.com
admin123
Customer	
customer@foodorder.com
customer123
🗺️ Pages & What They Do
URL	Page	Who Can Use
/	Home page	Everyone
/register	Create account	Everyone
/login	Login	Everyone
/foodmenu	Browse food items	Logged-in customers
/cart	Shopping cart	Logged-in customers
/checkout	Place order + Pay	Logged-in customers
/ordersuccess	Order confirmation	After payment
/admin/dashboard	Admin stats	Admin only
/admin/foods	Manage food items	Admin only
/admin/orders	View all orders	Admin only
/admin/customers	View all customers	Admin only
❗ Troubleshooting
Problem: npm run dev says "scripts disabled"
Fix: Run this once in PowerShell as Administrator:

powershell

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Problem: MongoDB not connecting
Fix: Make sure MongoDB service is running:

Press Win + R → type services.msc → press Enter
Find MongoDB in the list
Right-click → Start
Problem: Port 5000 already in use
Fix: Stop whatever is using port 5000:

powershell

netstat -ano | findstr :5000
taskkill /PID <the number shown> /F
Problem: node seed.js says "Cannot connect to MongoDB"
Fix: MongoDB is not running. See the fix above.

Problem: Frontend shows blank page / errors
Fix: Make sure the backend is running first (Window 1), then start the frontend (Window 2).

📊 How the Full System Works

Browser (React)
     │
     │  HTTP Requests
     ▼
Node.js Backend (port 5000)
     │
     │  Mongoose
     ▼
MongoDB Database
     │
     │  (on checkout)
     ▼
PayHere Sandbox (payment)
     │
     │  return_url
     ▼
/ordersuccess page
🔄 Every Day — How to Start
You only need to do these steps every time you work on the project:

Window 1 (Backend):

powershell

cd "C:\Users\INAM ALI SOOMRO\Desktop\New folder (3)\mubashir-project\frontend\backend"
npm run dev
Window 2 (Frontend):

powershell

cd "C:\Users\INAM ALI SOOMRO\Desktop\New folder (3)\mubashir-project\frontend\frontend"
npm run dev
Then open http://localhost:5173 in your browser. That's it! 🎉

