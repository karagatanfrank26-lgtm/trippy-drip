require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB with options
    const mongoUri = process.env.MONGO_URI + '/trippy_drip';
    console.log('Connecting to MongoDB:', mongoUri.replace(/:[^:]*@/, ':****@'));
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

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
    console.log(`✓ Created ${createdProducts.length} products`);

    // Seed test users
    const users = [
      {
        name: 'Test User',
        email: 'user@test.com',
        password: 'password123', // Will be hashed by pre-save middleware
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

    const createdUsers = await User.insertMany(users);
    console.log(`✓ Created ${createdUsers.length} users`);

    console.log('\n✓ Database seeded successfully!');
    console.log('\nTest credentials:');
    console.log('User - Email: user@test.com, Password: password123');
    console.log('Admin - Email: admin@test.com, Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
