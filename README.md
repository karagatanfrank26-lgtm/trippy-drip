# 🌟 High Trippy Mind's Drip - Streetwear E-Commerce Platform

**Mind Melt Guaranteed™** — A full-stack e-commerce platform for a premium streetwear brand with dark neon aesthetic, GCash payment integration, and comprehensive admin management.

## 📋 Quick Links

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#%EF%B8%8F-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Deployment Guide](#-deployment-guide)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 🛍️ Customer Features
- **Product Catalog**: Browse streetwear with category filters (T-Shirts, Hoodies, Accessories)
- **Smart Shopping**: Search bar, price sorting, responsive grid layout
- **Shopping Cart**: Add items with size selection, quantity adjustment, persistent storage
- **Checkout System**: Delivery address, payment method selection (COD/GCash)
- **GCash Integration**: 13-digit reference validation, optional payment proof upload
- **Order Tracking**: View complete order history with real-time status badges
- **User Authentication**: Secure JWT-based registration and login
- **Beautiful UI**: Dark neon aesthetic with glassmorphism effects

### 🔐 Admin Features
- **Dashboard Analytics**: Total orders, revenue calculations, pending order count
- **Order Management**: View all orders, update delivery status in real-time
- **Product Management**: Add/edit/delete clothing items, manage stock and sizes
- **User Management**: View all registered customers
- **Admin Protection**: Role-based access control

### 🎨 Design & UX
- Deep purple background (#1a0033) with neon pink (#ec4899) and cyan (#22d3ee) accents
- Glassmorphism: Semi-transparent cards with blur effects and glowing borders
- Fully responsive: Mobile, tablet, and desktop optimized
- Smooth animations: Logo pulse, transitions, hover effects
- Philippine Peso (₱) pricing

---

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **Vite 4.5.14** - Lightning-fast build tool & dev server
- **TailwindCSS 3.3.0** - Utility-first CSS with custom neon colors
- **React Router DOM 6.14.0** - Client-side routing
- **Axios 1.4.0** - HTTP client with JWT interceptor
- **Context API** - Global state management for Auth & Cart

### Backend
- **Node.js v26.1.0** - JavaScript runtime
- **Express.js 4.18.2** - Web server framework
- **Mongoose 7.0.0** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.0)** - Authentication tokens
- **bcryptjs 2.4.3** - Password hashing
- **express-rate-limit** - API rate limiting for security
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **MongoDB** - Primary database (cloud via Atlas or local)
- **In-Memory Storage** - Available for testing without database

### Deployment
- **Frontend**: Vercel (recommended) or GitHub Pages
- **Backend**: Render.com (recommended)
- **Database**: MongoDB Atlas (cloud)

---

## 📁 Project Structure

```
trippy-drip-final/
│
├── 📂 client/                       # React Frontend (Vite)
│   ├── src/
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx             # Landing page with featured products
│   │   │   ├── Shop.jsx             # Product catalog with filters
│   │   │   ├── Cart.jsx             # Shopping cart view
│   │   │   ├── Checkout.jsx         # Payment & delivery form
│   │   │   ├── MyOrders.jsx         # Order history
│   │   │   ├── Login.jsx            # User login
│   │   │   ├── Register.jsx         # User registration
│   │   │   ├── AdminPanel.jsx       # Admin dashboard
│   │   │   ├── Contact.jsx          # Contact form
│   │   │   └── About.jsx            # Brand story
│   │   ├── 📂 components/
│   │   │   ├── Navbar.jsx           # Navigation header
│   │   │   ├── Footer.jsx           # Footer
│   │   │   ├── ProductCard.jsx      # Product display
│   │   │   ├── CartItem.jsx         # Cart item component
│   │   │   ├── ProtectedRoute.jsx   # Auth protection
│   │   │   └── AdminRoute.jsx       # Admin protection
│   │   ├── 📂 context/
│   │   │   ├── AuthContext.jsx      # Auth state (user, login, logout)
│   │   │   └── CartContext.jsx      # Cart state (items, prices)
│   │   ├── 📂 api/
│   │   │   └── axiosInstance.js     # Axios with JWT interceptor
│   │   ├── App.jsx                  # Main app component
│   │   ├── index.css                # Global styles
│   │   └── main.jsx                 # React entry point
│   ├── .env.example                 # Environment template
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # TailwindCSS config
│   └── package.json
│
├── 📂 server/                        # Node.js Backend
│   ├── 📂 models/
│   │   ├── User.js                  # User schema with bcrypt
│   │   ├── Product.js               # Product schema
│   │   └── Order.js                 # Order & payment schema
│   ├── 📂 routes/
│   │   ├── auth.js                  # POST /register, POST /login
│   │   ├── products.js              # GET /products (public)
│   │   ├── orders.js                # POST /orders, GET /my-orders
│   │   └── admin.js                 # Admin endpoints
│   ├── 📂 controllers/
│   │   ├── authController.js        # Auth logic
│   │   ├── productController.js     # Product logic
│   │   ├── orderController.js       # Order logic
│   │   └── adminController.js       # Admin logic
│   ├── 📂 middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── adminMiddleware.js       # Admin role check
│   ├── mockDb.js                    # In-memory database
│   ├── server.js                    # Express server
│   ├── .env.example                 # Environment template
│   └── package.json
│
└── README.md                         # This file
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (included with Node.js)
- **MongoDB** (optional - use MongoDB Atlas cloud or local instance)
- **Git** (optional - for cloning)

### Step 1: Navigate to Project

```bash
cd "path/to/trippy drip final"
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

Done! ✅

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in `/server`:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database (MongoDB Atlas)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/trippy-drip?appName=Cluster0

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_2024

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Setting up MongoDB Atlas:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP: `0.0.0.0/0` (or your specific IP)
5. Get connection string: `mongodb+srv://user:pass@cluster.net/`
6. Replace `user:pass` and `cluster` in `MONGO_URI`

### Frontend Environment Variables

Create a `.env` file in `/client`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Terminal 1: Start Backend

```bash
cd server
npm run dev
```

✅ You should see:
```
Using mock database for testing
Server running on port 5000
```

### Terminal 2: Start Frontend

```bash
cd client
npm run dev
```

✅ You should see:
```
VITE v4.5.14 ready in XXX ms
Local:   http://localhost:5173/
```

### Open Browser

Visit: **http://localhost:5173**

---

## 🔗 API Documentation

### Base URL
```
http://localhost:5000/api
```

### 🔐 Authentication Routes

#### Register User
```http
POST /auth/register
Content-Type: application/json

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "address": "123 Main Street",
  "phone": "09123456789"
}

Response (201):
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

Request:
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 🛍️ Product Routes (Public)

#### Get All Products
```http
GET /products

Response (200):
[
  {
    "id": "1",
    "name": "Neon Dreams T-Shirt",
    "category": "T-Shirts",
    "price": 599,
    "stock": 50,
    "image": "https://via.placeholder.com/...",
    "description": "Experience the trippy essence of neon vibes",
    "sizesAvailable": ["S", "M", "L", "XL"]
  },
  ...
]
```

#### Get Single Product
```http
GET /products/:id

Response (200): { ...product object... }
```

### 📦 Order Routes (Auth Required)

#### Create Order
```http
POST /orders
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

Request:
{
  "items": [
    {
      "product": "1",
      "qty": 2,
      "selectedSize": "M",
      "price": 599
    }
  ],
  "totalAmount": 1298,
  "paymentMethod": "GCash",
  "gcashReferenceNumber": "1234567890123",
  "address": "123 Main Street",
  "phone": "09123456789"
}

Response (201):
{
  "message": "Order created successfully",
  "order": {
    "id": "order_123",
    "status": "Pending",
    "totalAmount": 1298,
    "createdAt": "2024-05-14T..."
  }
}
```

#### Get My Orders
```http
GET /orders/my-orders
Authorization: Bearer <JWT_TOKEN>

Response (200):
[
  {
    "id": "...",
    "items": [...],
    "totalAmount": 1298,
    "status": "Confirmed",
    "paymentMethod": "GCash",
    "createdAt": "2024-05-14T..."
  },
  ...
]
```

### 🔧 Admin Routes (Admin Token Required)

#### Get All Orders
```http
GET /admin/orders
Authorization: Bearer <ADMIN_JWT_TOKEN>

Response (200): [{ ...all orders... }]
```

#### Update Order Status
```http
PUT /admin/orders/:id/status
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

Request:
{
  "status": "Shipped"
}

Valid Statuses: Pending, Confirmed, Shipped, Delivered, Cancelled
```

#### Add Product (Admin)
```http
POST /admin/products
Authorization: Bearer <ADMIN_JWT_TOKEN>

Request:
{
  "name": "Cosmic Hoodie",
  "category": "Hoodies",
  "price": 1299,
  "stock": 30,
  "image": "https://...",
  "description": "Deep space purple with neon accents",
  "sizesAvailable": ["S", "M", "L", "XL"]
}
```

#### Get All Users
```http
GET /admin/users
Authorization: Bearer <ADMIN_JWT_TOKEN>

Response (200): [{ ...users without passwords... }]
```

---

## 🌍 Deployment Guide

### Part 1: Deploy Frontend to Vercel

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/trippy-drip.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Select your `trippy-drip` repository
   - Set root directory to `./client`
   - Add environment variable:
     - `VITE_API_BASE_URL` = `https://your-render-backend-url/api`
   - Click "Deploy"

3. **After deployment**, update the URL in your Render backend configuration

### Part 2: Deploy Backend to Render

1. **Update package.json** (in `/server`)
   ```json
   "scripts": {
     "dev": "nodemon server.js",
     "start": "node server.js"
   }
   ```

2. **Push to GitHub** (if not already done)

3. **Create Render service**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect GitHub repo
   - Configure:
     - **Name**: `trippy-drip-backend`
     - **Branch**: `main`
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       ```
       PORT=5000
       MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/trippy-drip
       JWT_SECRET=your_jwt_secret
       FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
       CLOUDINARY_CLOUD_NAME=your_name
       CLOUDINARY_API_KEY=your_key
       CLOUDINARY_API_SECRET=your_secret
       ```
   - Click "Create Web Service"

4. **Update Frontend**
   - Go to Vercel project settings
   - Update `VITE_API_BASE_URL` to your Render URL (e.g., `https://trippy-drip-backend.onrender.com/api`)
   - Redeploy

### Part 3: Production MongoDB Setup

1. **MongoDB Atlas** (recommended)
   - Go to https://www.mongodb.com/cloud/atlas
   - Create cluster
   - Create database user with strong password
   - Add whitelist entry: `0.0.0.0/0`
   - Get connection string
   - Use in Render environment variable

2. **Test connection**
   - Monitor Render logs for connection status
   - Try registering a user on your Vercel app
   - Should see data in MongoDB Atlas

---

## 🧪 Test Credentials

**Sample Account (Pre-created):**
```
Email: test@trippy.com
Password: Test123!
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Port 5173 won't open**
```bash
# Try a different port
npm run dev -- --port 5174
```

**CORS errors**
- Verify `FRONTEND_URL` in backend matches your app URL
- Check `.env` in both client and server

**Cart items disappear**
- Clear localStorage: Press F12 → Application → Clear all

### Backend Issues

**Port 5000 already in use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**MongoDB connection fails**
```
Error: querySrv ECONNREFUSED
```
- Verify IP whitelist: MongoDB Atlas → Security → Network Access
- Check connection string spelling
- Test with mock database: Backend still works without MongoDB

**JWT token expired**
- Frontend auto-redirects to login
- Clear localStorage and log in again

### General Debugging

1. **Check browser console** (F12)
   - Network tab for API requests
   - Console for errors

2. **Check backend logs**
   - Terminal running `npm run dev`
   - Look for error messages

3. **Check .env files**
   - Verify all variables are set
   - No spaces around `=`
   - Correct URLs and ports

---

## 📝 Important Notes

- **Mock Database**: Default testing mode (in-memory storage)
- **Production Database**: Switch to MongoDB Atlas for persistence
- **Images**: Replace with real Cloudinary credentials
- **GCash**: Currently validates format; implement real payment verification
- **Email**: Consider adding email notifications
- **Security**: In production, use HTTPS, secure cookies, stronger rate limiting

---

## 🎯 Next Steps

1. ✅ Deploy to Vercel + Render
2. ✅ Set up MongoDB Atlas
3. ⬜ Add Cloudinary image uploads
4. ⬜ Implement email notifications
5. ⬜ Set up GCash payment webhook
6. ⬜ Add customer support chat
7. ⬜ Create mobile app (React Native)

---

## 📄 License

© 2024 High Trippy Mind's Drip. All rights reserved.  
**Mind Melt Guaranteed™**

---

## 💬 Support

Having trouble? 
1. Check [Troubleshooting](#-troubleshooting) section
2. Review error messages in console
3. Check backend terminal output
4. Verify .env files are correct

**Happy coding! 🚀🌟**
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
trippy-drip-final/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── admin.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── adminController.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── About.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── OrderCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── api/
│   │   │   └── axiosInstance.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account
- Git

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file from `.env.example`**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your credentials**
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/trippy-drip
   JWT_SECRET=your_super_secret_jwt_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   Backend runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory** (in a new terminal)
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file from `.env.example`**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` (if using custom backend URL)**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Testing the Application

1. **Access the website**: Open `http://localhost:5173`

2. **Create account**: Click "Join Us" and register

3. **Shop products**: Browse "Shop" page with filters and search

4. **Add to cart**: Select size and quantity

5. **Checkout**: 
   - Choose payment method (COD or GCash)
   - Enter delivery details
   - For GCash: Enter 13-digit reference number (e.g., 1234567890123)

6. **Admin access**:
   - Register as user first
   - Update user role to "admin" in MongoDB
   - Access `/admin` panel

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products (Public)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders (Auth Required)
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user's orders

### Admin (Auth + Admin Role Required)
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/users` - Get all users

## 💰 Payment Methods

### Cash on Delivery (COD)
- No additional setup required
- Customers pay upon delivery
- Status: Pending → Confirmed → Shipped → Delivered

### GCash
- **Number**: 09XX-XXX-XXXX (placeholder - update with actual number)
- **Reference Number**: 13-digit validation
- **Screenshot**: Optional upload capability
- QR code display on checkout page

## 🎯 Default Admin Account

Create an admin user:

```javascript
// In MongoDB, update a user document:
{
  email: "admin@example.com",
  role: "admin"
}
```

Or register and manually promote in MongoDB.

## 🚢 Deployment

### Backend (Render.com)

1. **Push code to GitHub**
2. **Create new Web Service on Render**
3. **Connect GitHub repository**
4. **Set environment variables**:
   - PORT: 5000
   - MONGO_URI: Your MongoDB Atlas connection
   - JWT_SECRET: Secret key
   - CLOUDINARY_* : Cloudinary credentials
   - FRONTEND_URL: Your Vercel/Pages URL

5. **Deploy**

### Frontend (Vercel or GitHub Pages)

**Option 1: Vercel**
```bash
npm install -g vercel
vercel
```

**Option 2: GitHub Pages**
```bash
npm run build
npm run deploy
```

## 🎨 Color Scheme

- **Primary Background**: `#1a0033` (Deep Purple)
- **Secondary Background**: `#2d0052` (Purple)
- **Accent 1**: `#ec4899` (Neon Pink)
- **Accent 2**: `#22d3ee` (Neon Cyan)
- **Text**: `#ffffff` (White)

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs (10 rounds)
- Rate limiting on auth endpoints (5 requests per 15 min)
- CORS enabled for frontend origin only
- Admin-only routes with middleware validation
- Input validation on all routes

## 📝 Environment Variables Reference

### Backend `.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Ensure backend server is running on port 5000
- Check CORS origin matches your frontend URL
- Verify `FRONTEND_URL` in backend `.env`

### "Products not loading"
- Verify MongoDB connection string is correct
- Check database exists and has product data
- Look for errors in backend console

### "Cart persisting incorrectly"
- Clear browser localStorage
- Ensure CartContext is properly wrapping your app
- Check browser console for errors

### "GCash validation failing"
- Reference number must be exactly 13 digits
- Only numeric characters allowed
- Check validation in Checkout component

## 📱 Mobile Responsiveness

- Fully responsive grid layouts
- Mobile menu navigation
- Touch-friendly buttons and inputs
- Optimized images for mobile devices
- Readable font sizes on all screen sizes

## 🎬 Features Showcase

### Home Page
- Animated hero section with logo pulse effect
- Featured products grid
- Promotional banner for limited drops
- Call-to-action buttons

### Shop Page
- Category filtering (All, T-Shirts, Hoodies, Accessories)
- Search functionality
- Sort options (Name, Price Low/High)
- Product cards with stock status
- Size and quantity selector modal

### Checkout
- Address and phone input
- Payment method selection
- GCash reference number input with validation
- Real-time order total calculation
- Form validation with neon-colored error messages

### Admin Panel
- Dashboard with key metrics
- Order management table
- Product CRUD operations
- User management view
- Status update dropdown

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Mongoose](https://mongoosejs.com)
- [TailwindCSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)

## 📄 License

This project is proprietary and created for High Trippy Mind's Drip brand.

## 🤝 Support

For issues or questions, contact: info@trippydrip.com

---

**Mind Melt Guaranteed™** - High Trippy Mind's Drip © 2024
