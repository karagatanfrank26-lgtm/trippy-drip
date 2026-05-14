require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');

// Try to fix DNS resolution issues
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']); 

const app = express();

// Connect to MongoDB
if (process.env.MONGO_URI) {
  const mongoUri = process.env.MONGO_URI.includes('/') ? process.env.MONGO_URI : `${process.env.MONGO_URI}/trippy_drip`;
  
  const connectWithRetry = async () => {
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        w: 'majority'
      });
      console.log('✓ Connected to MongoDB');
      
      // Run seed on first connection if needed
      const Product = require('./models/Product');
      const User = require('./models/User');
      const bcrypt = require('bcryptjs');
      
      const productCount = await Product.countDocuments();
      if (productCount === 0) {
        console.log('Database is empty. Add data through MongoDB Compass or the seed endpoint.');
      }
      
      // Auto-seed users if none exist
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('📝 No users found. Auto-seeding test users...');
        try {
          const testUsers = [
            {
              name: 'Test User',
              email: 'user@test.com',
              password: 'password123',
              role: 'user',
              address: '123 Main St, City',
              phone: '09123456789'
            },
            {
              name: 'Admin User',
              email: 'admin@test.com',
              password: 'admin123',
              role: 'admin',
              address: '456 Admin St, Admin City',
              phone: '09987654321'
            }
          ];
          
          for (let userData of testUsers) {
            const user = new User(userData);
            await user.save();
            console.log(`✓ Created user: ${userData.email}`);
          }
          console.log('✅ Test users seeded successfully');
        } catch (seedErr) {
          console.error('⚠️ Error seeding users:', seedErr.message);
        }
      }
    } catch (err) {
      console.error('✗ MongoDB connection failed:', err.message);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    }
  };
  
  connectWithRetry();
} else {
  console.warn('✗ MONGO_URI not found in environment variables');
}

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/dev', require('./routes/seed')); // Development seed endpoint

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
