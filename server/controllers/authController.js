const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if user exists
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email.toLowerCase() });
    } catch (dbErr) {
      console.error('DB Error checking user:', dbErr.message);
      return res.status(503).json({ message: 'Database connection error. Please try again later.' });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user (password will be hashed by pre-save middleware)
    let user = new User({ 
      name, 
      email: email.toLowerCase(), 
      password,
      address, 
      phone,
      role: 'user'
    });
    
    try {
      user = await user.save();
    } catch (saveErr) {
      console.error('DB Error saving user:', saveErr.message);
      return res.status(503).json({ message: 'Failed to register user. Database error: ' + saveErr.message });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET || 'trippy_drip_super_secret_key_2024',
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      message: 'User registered successfully', 
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt for:', email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    let user;
    try {
      user = await User.findOne({ email: email.toLowerCase() });
      console.log('User found:', user ? 'Yes' : 'No', user?.email);
    } catch (dbErr) {
      console.error('DB Error finding user:', dbErr.message);
      return res.status(503).json({ message: 'Database connection error. Please try again later.' });
    }

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    let isMatch;
    try {
      console.log('Comparing password...');
      console.log('Stored hash exists:', !!user.password);
      isMatch = await user.comparePassword(password);
      console.log('Password match result:', isMatch);
    } catch (compareErr) {
      console.error('Password compare error:', compareErr.message);
      return res.status(500).json({ message: 'Authentication error: ' + compareErr.message });
    }

    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET || 'trippy_drip_super_secret_key_2024',
      { expiresIn: '7d' }
    );

    console.log('Login successful for:', email);
    res.json({ 
      message: 'Login successful',
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { register, login };
