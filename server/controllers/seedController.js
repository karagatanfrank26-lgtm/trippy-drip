const Product = require('../models/Product');
const User = require('../models/User');

const seedData = async (req, res) => {
  try {
    // Check if data already exists
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();

    if (productCount > 0 && userCount > 0) {
      return res.status(400).json({ 
        message: 'Database already has data',
        products: productCount,
        users: userCount
      });
    }

    // Clear old data
    if (productCount === 0) {
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
    }

    if (userCount === 0) {
      // Delete existing users to start fresh
      await User.deleteMany({});
      
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

      console.log(`✓ Created ${users.length} users with proper password hashing`);
    }

    const finalProductCount = await Product.countDocuments();
    const finalUserCount = await User.countDocuments();

    res.json({
      message: 'Database seeded successfully!',
      products: finalProductCount,
      users: finalUserCount,
      testCredentials: {
        user: { email: 'user@test.com', password: 'password123' },
        admin: { email: 'admin@test.com', password: 'admin123' }
      }
    });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ message: 'Error seeding database', error: err.message });
  }
};

module.exports = { seedData };
