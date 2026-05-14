# 🚀 Deployment Guide - High Trippy Mind's Drip

Complete step-by-step guide to deploy your streetwear e-commerce platform to production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Setup](#github-setup)
3. [Deploy Frontend to Vercel](#deploy-frontend-to-vercel)
4. [Deploy Backend to Render](#deploy-backend-to-render)
5. [MongoDB Atlas Setup](#mongodb-atlas-setup)
6. [Final Configuration](#final-configuration)
7. [Testing Production](#testing-production)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

You'll need:
- GitHub account (https://github.com)
- Vercel account (https://vercel.com) - sign in with GitHub
- Render account (https://render.com) - sign in with GitHub
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

**Time estimate:** 15-20 minutes

---

## 🔧 GitHub Setup

### Step 1: Initialize Git Repository

```bash
cd "path/to/trippy drip final"
git init
```

### Step 2: Create .gitignore

Create a `.gitignore` file in the root:

```
node_modules/
.env
.env.local
dist/
build/
.DS_Store
```

### Step 3: Commit Code

```bash
git add .
git commit -m "Initial commit - Trippy Drip e-commerce platform"
```

### Step 4: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `trippy-drip`
3. Description: `Streetwear e-commerce with GCash payment`
4. Make it **Public**
5. Click "Create repository"

### Step 5: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/trippy-drip.git
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

## 🎨 Deploy Frontend to Vercel

### Step 1: Connect Vercel to GitHub

1. Go to https://vercel.com
2. Sign up / Log in with GitHub
3. Click "Authorize Vercel"
4. Verify your GitHub account

### Step 2: Import Project

1. Click "New Project"
2. Select your `trippy-drip` repository
3. Click "Import"

### Step 3: Configure Project

1. **Framework Preset**: React
2. **Root Directory**: `client` (important!)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

**Click the settings icon next to Root Directory** and change to `./client`

### Step 4: Add Environment Variables

1. Click "Environment Variables"
2. Add new variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `http://localhost:5000/api` (will update later)
3. Click "Add"

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://trippy-drip-abc123.vercel.app`

✅ Frontend is deployed! (temporarily pointing to localhost backend)

---

## 🔙 Deploy Backend to Render

### Step 1: Create .env for Production

Create a `server/.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/trippy-drip?appName=Cluster0
JWT_SECRET=use_a_random_string_like_abc123xyz789def
FRONTEND_URL=https://your-vercel-url.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
```

**Note**: Don't push .env to GitHub! Only commit `.env.example`

### Step 2: Update package.json

In `server/package.json`, add start script:

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Step 3: Push to GitHub

```bash
git add server/package.json
git commit -m "Add start script for production"
git push
```

### Step 4: Create Render Service

1. Go to https://render.com
2. Sign up / Log in with GitHub
3. Click "New +"
4. Select "Web Service"
5. Connect your GitHub repository

### Step 5: Configure Web Service

1. **Name**: `trippy-drip-backend`
2. **Environment**: Node
3. **Region**: Select closest to you
4. **Branch**: `main`
5. **Build Command**: `npm install`
6. **Start Command**: `npm start`
7. **Plan**: Free

### Step 6: Add Environment Variables

Click "Environment" and add:

```
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/trippy-drip
JWT_SECRET=your_random_secret_key
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Step 7: Deploy

1. Click "Create Web Service"
2. Render will build and deploy automatically
3. You'll get a URL like: `https://trippy-drip-backend.onrender.com`
4. **Keep this URL handy!**

⏳ First deploy takes 3-5 minutes. Subsequent deploys are faster.

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up with email or GitHub
3. Create organization and project

### Step 2: Create Cluster

1. Click "Create"
2. Choose:
   - **Cloud Provider**: AWS
   - **Region**: Singapore (ap-southeast-1) or closest to you
   - **Tier**: M0 Sandbox (Free)
3. Click "Create Cluster"
4. Wait 2-3 minutes for cluster to initialize

### Step 3: Create Database User

1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Set:
   - **Authentication Method**: Password
   - **Username**: `trippy_user` (or your choice)
   - **Password**: Generate strong password and save it!
   - **Database User Privileges**: Read and write to any database
4. Click "Add User"

### Step 4: Configure Network Access

1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (choose `0.0.0.0/0`)
4. Click "Confirm"

### Step 5: Get Connection String

1. Go to "Databases"
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js"
5. Copy the connection string:
   ```
   mongodb+srv://trippy_user:PASSWORD@cluster0.xxxxx.mongodb.net/?appName=Cluster0
   ```
6. Replace `PASSWORD` with your database password
7. Replace `/?appName=Cluster0` with `/trippy-drip?appName=Cluster0`

Final string should look like:
```
mongodb+srv://trippy_user:MySecurePassword123@cluster0.xxxxx.mongodb.net/trippy-drip?appName=Cluster0
```

### Step 6: Update Render Environment Variables

1. Go to Render.com dashboard
2. Select your `trippy-drip-backend` service
3. Click "Environment"
4. Update `MONGO_URI` with your MongoDB connection string
5. Click "Save Changes"
6. Render will auto-deploy

✅ Backend is now connected to MongoDB Atlas!

---

## 🔄 Final Configuration

### Step 1: Update Frontend Environment

1. Go to Vercel dashboard
2. Select `trippy-drip` project
3. Go to "Settings" → "Environment Variables"
4. Update `VITE_API_BASE_URL`:
   ```
   https://trippy-drip-backend.onrender.com/api
   ```
5. Click "Save"
6. Go to "Deployments" → Click "Redeploy"
7. Wait 2-3 minutes

### Step 2: Update Backend CORS

In `server/server.js`, verify CORS is set to your Vercel URL:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-vercel-url.vercel.app',
  credentials: true
}));
```

### Step 3: Test Connection

1. Visit your Vercel URL: `https://trippy-drip-xxx.vercel.app`
2. Register a new account
3. Check if you get success message
4. Verify user was created in MongoDB Atlas

---

## ✅ Testing Production

### Test 1: Registration

1. Go to your Vercel app
2. Click "Register"
3. Fill form with test data:
   ```
   Name: Test User
   Email: testprod@example.com
   Password: TestPass123!
   ```
4. Click "Register"
5. ✅ Should redirect to home page with login token

### Test 2: Shop Page

1. Click "Shop"
2. ✅ Should display all 6 products from MongoDB
3. Try category filters
4. Try search

### Test 3: Add to Cart

1. Click "Add to Cart" on a product
2. Select size and quantity
3. ✅ Item should appear in cart
4. Check cart persists after page reload

### Test 4: Checkout (COD)

1. Go to Cart → Checkout
2. Fill delivery info
3. Select "Cash on Delivery"
4. Click "Complete Order"
5. ✅ Should redirect to MyOrders page
6. Order should appear with "Pending" status

### Test 5: Checkout (GCash)

1. Add items to cart
2. Go to Checkout
3. Select "GCash"
4. Enter reference number: `1234567890123`
5. Click "Complete Order"
6. ✅ Order created successfully

### Test 6: Admin Panel

1. Get admin account (manually update in MongoDB: set role to "admin")
2. Login with admin account
3. Go to Admin Panel
4. ✅ Dashboard should show:
   - Total Orders
   - Total Revenue
   - Pending Orders count
5. Click "Orders" tab → Should see all orders
6. Change an order status → Click update

---

## 🐛 Troubleshooting

### "Cannot POST /api/orders"

**Problem**: Backend URL is incorrect in frontend

**Solution**:
1. Go to Vercel project settings
2. Check `VITE_API_BASE_URL` environment variable
3. Make sure it matches your Render URL exactly
4. Redeploy from "Deployments" tab

### "Connection refused" Error

**Problem**: Backend is sleeping (Render free tier sleeps after 15 min inactivity)

**Solution**:
- Just wait 30 seconds and try again
- Consider upgrading to paid Render plan for always-on service

### MongoDB Connection Error

**Problem**: `ECONNREFUSED` or `EHOSTUNREACH`

**Solutions**:
1. Verify connection string in Render env variables
2. Check MongoDB Atlas IP whitelist (should be `0.0.0.0/0`)
3. Verify database user password is correct
4. Test connection locally first

### CORS Error in Console

**Problem**: `Access to XMLHttpRequest blocked by CORS`

**Solution**:
1. Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
2. Redeploy backend after changing env variables
3. Clear browser cache (Ctrl+Shift+Delete)

### Products Not Showing

**Problem**: Shop page shows "Loading..."

**Solutions**:
1. Check browser console for API errors
2. Verify `VITE_API_BASE_URL` is correct
3. Test backend directly: `https://your-backend-url/api/products`
4. Check MongoDB Atlas has data

### Files Not Found (404)

**Problem**: Routes like `/shop` show 404

**Solution**:
In Vercel project settings, add to "Build & Development Settings":
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- Redeploy

---

## 📊 Monitoring

### Check Backend Logs (Render)

1. Go to render.com dashboard
2. Select `trippy-drip-backend`
3. Click "Logs"
4. Real-time logs show all requests and errors

### Check MongoDB Data

1. Go to MongoDB Atlas
2. Click "Databases"
3. Click "Browse Collections"
4. View users, products, orders

### Check Frontend Errors (Vercel)

1. Go to vercel.com dashboard
2. Select `trippy-drip` project
3. Click "Deployments" → view individual deployment logs

---

## 🎯 Performance Tips

1. **Reduce First Load**: Images are largest files
   - Use Cloudinary CDN instead of placeholder URLs
   - Enable image optimization in Vercel

2. **Database**: MongoDB Atlas auto-scales
   - Monitor usage in Atlas dashboard
   - Upgrade tier if approaching limits

3. **Backend**: Render's free tier sleeps after 15 min
   - Consider upgrading for production
   - Or keep it active with periodic requests

---

## 🔐 Security Checklist

- ✅ All secrets in `.env` (not committed to GitHub)
- ✅ JWT_SECRET is random and strong (not "secret123")
- ✅ MONGO_URI uses strong database password
- ✅ CORS allows only your Vercel domain
- ✅ Rate limiting active on auth routes
- ✅ Passwords hashed with bcrypt
- ✅ No API keys exposed in frontend code

---

## 📞 Support

**Stuck?** Check:
1. Your terminal output for error messages
2. Browser console (F12) for frontend errors
3. Render logs for backend errors
4. MongoDB Atlas dashboard for database issues

**Common issues solved above!** 👆

---

Good luck! Your streetwear platform is now live! 🚀🌟
