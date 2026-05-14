# 🚀 HIGH TRIPPY MIND'S DRIP - QUICK START GUIDE

## Setup Instructions (5 minutes to running)

### 1️⃣ Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# - MongoDB Atlas connection string
# - JWT secret
# - Cloudinary credentials

# Start backend
npm run dev
# ✅ Backend runs on http://localhost:5000
```

### 2️⃣ Frontend Setup (New Terminal)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start frontend
npm run dev
# ✅ Frontend runs on http://localhost:5173
```

### 3️⃣ Open Your Browser

Visit: `http://localhost:5173`

---

## 📝 Environment Setup Checklist

### Backend (.env)
- [ ] PORT (default: 5000)
- [ ] MONGO_URI (MongoDB Atlas connection string)
- [ ] JWT_SECRET (random string, e.g., `your_super_secret_key_123`)
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] FRONTEND_URL (http://localhost:5173 for local development)

### Frontend (.env)
- [ ] VITE_API_BASE_URL (http://localhost:5000/api for local development)

---

## 🧪 Test the Full Flow

1. **Register**: Click "Join Us" and create an account
2. **Browse**: Go to Shop and explore products
3. **Add to Cart**: Select a product, choose size/quantity, add to cart
4. **Checkout**: 
   - Choose payment method (COD or GCash)
   - Enter delivery address
   - For GCash: Enter any 13-digit number (e.g., 1234567890123)
5. **Track Order**: Go to "My Orders" to see your order

---

## 🔑 Admin Panel Access

1. Register a normal user
2. In MongoDB, update the user document:
   ```json
   {
     "email": "your@email.com",
     "role": "admin"
   }
   ```
3. Logout and login again
4. Click "Admin" in navbar to access admin panel

---

## 📊 Default Test Data

### Sample Credentials
- **User**: user@test.com / password123
- **Admin**: admin@test.com / password123

### Sample GCash Reference Number
- `1234567890123` (13 digits)

---

## 🎨 Customization Guide

### Change Brand Colors
Edit `client/src/index.css` and `client/tailwind.config.js`:
- Primary Purple: `#1a0033`
- Neon Pink: `#ec4899`
- Neon Cyan: `#22d3ee`

### Update Brand Name
- `client/src/components/Navbar.jsx`
- `client/src/components/Footer.jsx`
- `client/src/pages/Home.jsx`

### Add New Product Categories
- Edit `productSchema` in `server/models/Product.js`
- Update category options in `server/controllers/adminController.js`

---

## 🚢 Deploy to Production

### Deploy Backend (Render.com)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repo
4. Set environment variables
5. Deploy

### Deploy Frontend (Vercel)

1. `vercel login`
2. `vercel --prod`
3. Or connect GitHub repo in Vercel dashboard

---

## 📞 Need Help?

### Common Issues

**Backend won't start**
- Check MongoDB connection string
- Verify port 5000 is not in use
- Check .env file is in server/ directory

**Frontend can't connect to API**
- Ensure backend is running on :5000
- Check VITE_API_BASE_URL in .env
- Check browser console for CORS errors

**Cart not persisting**
- Clear browser localStorage
- Check that CartProvider wraps App component
- Check browser DevTools → Application → Local Storage

**GCash validation failing**
- Reference number must be exactly 13 digits
- Only numbers allowed (no spaces or dashes)
- Check Checkout.jsx validation logic

---

## 📁 Project Structure Summary

```
trippy-drip-final/
├── server/          ← Node.js + Express backend
│   ├── models/      ← MongoDB schemas
│   ├── routes/      ← API endpoints
│   ├── middleware/  ← Auth & admin middleware
│   ├── controllers/ ← Route handlers
│   └── server.js    ← Entry point
├── client/          ← React + Vite frontend
│   ├── src/
│   │   ├── pages/   ← Full pages
│   │   ├── components/ ← Reusable components
│   │   ├── context/ ← Auth & Cart context
│   │   └── api/     ← Axios config
│   └── public/      ← Static files
└── README.md        ← Full documentation
```

---

## ✨ Features Checklist

- [x] Dark neon streetwear aesthetic
- [x] Glassmorphism card design
- [x] Responsive mobile layout
- [x] User authentication (JWT)
- [x] Product catalog with filters
- [x] Shopping cart with size selection
- [x] Checkout with payment methods
- [x] GCash payment integration
- [x] Order tracking
- [x] Admin dashboard
- [x] Order management
- [x] Product CRUD
- [x] Rate limiting on auth
- [x] MongoDB persistence
- [x] Cloudinary image upload ready

---

## 🎯 Next Steps

1. Install dependencies
2. Setup .env files
3. Start backend
4. Start frontend
5. Register an account
6. Start shopping!

**Mind Melt Guaranteed™** 🌀✨
