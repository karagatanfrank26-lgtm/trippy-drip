const express = require('express');
const router = express.Router();
const { seedData } = require('../controllers/seedController');
const Product = require('../models/Product');
const User = require('../models/User');

// Seed database endpoint (for development only)
router.post('/seed', seedData);

// Reset and reseed database - with secret key protection
router.post('/reset', async (req, res) => {
  try {
    const secretKey = req.headers['x-reset-secret'] || req.body.secret;
    const validSecret = process.env.RESET_SECRET_KEY || 'dev-reset-key-change-in-production';
    
    // Allow reset in development or with correct secret
    if (process.env.NODE_ENV === 'production' && secretKey !== validSecret) {
      console.log('❌ Unauthorized reset attempt');
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    console.log('🔄 Resetting database...');
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Cleared all data');
    
    // Seed products
    const products = [
      {
        name: 'Trippy Mind T-Shirt',
        category: 'T-Shirts',
        price: 499,
        stock: 50,
        image: 'https://via.placeholder.com/300?text=Trippy+T-Shirt',
        description: 'Classic trippy mind t-shirt with vibrant colors',
        sizesAvailable: ['S', 'M', 'L', 'XL']
      },
      {
        name: 'Drip Hoodie',
        category: 'Hoodies',
        price: 1299,
        stock: 30,
        image: 'https://via.placeholder.com/300?text=Drip+Hoodie',
        description: 'Comfortable and stylish drip hoodie',
        sizesAvailable: ['M', 'L', 'XL']
      },
      {
        name: 'Trippy Cap',
        category: 'Accessories',
        price: 299,
        stock: 100,
        image: 'https://via.placeholder.com/300?text=Trippy+Cap',
        description: 'Classic trippy cap for everyday wear',
        sizesAvailable: ['S', 'M', 'L']
      },
      {
        name: 'Mind Bender Tee',
        category: 'T-Shirts',
        price: 549,
        stock: 40,
        image: 'https://via.placeholder.com/300?text=Mind+Bender+Tee',
        description: 'Express your mind with this unique tee',
        sizesAvailable: ['S', 'M', 'L', 'XL']
      },
      {
        name: 'Premium Drip Hoodie',
        category: 'Hoodies',
        price: 1499,
        stock: 25,
        image: 'https://via.placeholder.com/300?text=Premium+Hoodie',
        description: 'Premium quality hoodie with special design',
        sizesAvailable: ['S', 'M', 'L', 'XL']
      },
      {
        name: 'Trippy Socks',
        category: 'Accessories',
        price: 149,
        stock: 200,
        image: 'https://via.placeholder.com/300?text=Trippy+Socks',
        description: 'Colorful trippy socks for true fans',
        sizesAvailable: ['S', 'M', 'L']
      }
    ];
    
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);
    
    // Seed users with plain passwords (will be hashed by pre-save middleware)
    const users = [
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

    // Save users through Mongoose to trigger pre-save hook
    for (let userData of users) {
      let user = new User(userData);
      await user.save();
    }

    console.log(`✅ Created ${users.length} users with proper password hashing`);

    const finalProductCount = await Product.countDocuments();
    const finalUserCount = await User.countDocuments();

    res.json({
      message: 'Database reset and seeded successfully!',
      products: finalProductCount,
      users: finalUserCount,
      testCredentials: {
        user: { email: 'user@test.com', password: 'password123' },
        admin: { email: 'admin@test.com', password: 'admin123' }
      }
    });
  } catch (err) {
    console.error('❌ Reset error:', err);
    res.status(500).json({ message: 'Error resetting database', error: err.message });
  }
});

module.exports = router;
