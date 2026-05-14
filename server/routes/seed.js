const express = require('express');
const router = express.Router();
const { seedData } = require('../controllers/seedController');
const Product = require('../models/Product');
const User = require('../models/User');

// Seed database endpoint (for development only)
router.post('/seed', seedData);

// Reset and reseed database
router.post('/reset', async (req, res) => {
  try {
    console.log('Resetting database...');
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared all data');
    
    // Call seed
    const seedRes = await seedData(req, res);
    return seedRes;
  } catch (err) {
    res.status(500).json({ message: 'Error resetting database', error: err.message });
  }
});

module.exports = router;
