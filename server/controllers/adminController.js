const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const ShippingConfig = require('../models/ShippingConfig');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user').populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, image, description, sizesAvailable } = req.body;

    if (!name || !category || !price || !image || !description || !sizesAvailable) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let product = new Product({
      name,
      category,
      price,
      stock,
      image,
      description,
      sizesAvailable
    });

    product = await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, category, price, stock, image, description, sizesAvailable } = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id, { 
      name, category, price, stock, image, description, sizesAvailable 
    }, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getShippingConfig = async (req, res) => {
  try {
    let shipping = await ShippingConfig.findOne({ isDefault: true });
    if (!shipping) {
      // Create default shipping if doesn't exist
      shipping = new ShippingConfig({
        name: 'Standard Shipping',
        cost: 100,
        estimatedDays: 3,
        description: 'Standard delivery shipping',
        isDefault: true
      });
      await shipping.save();
    }
    res.json(shipping);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateShippingConfig = async (req, res) => {
  try {
    const { cost, estimatedDays, name, description } = req.body;

    if (cost === undefined || estimatedDays === undefined) {
      return res.status(400).json({ message: 'Cost and estimatedDays are required' });
    }

    let shipping = await ShippingConfig.findOne({ isDefault: true });
    if (!shipping) {
      shipping = new ShippingConfig({
        name: name || 'Standard Shipping',
        cost,
        estimatedDays,
        description: description || 'Standard delivery shipping',
        isDefault: true
      });
    } else {
      shipping.name = name || shipping.name;
      shipping.cost = cost;
      shipping.estimatedDays = estimatedDays;
      if (description) shipping.description = description;
    }

    await shipping.save();
    res.json({ message: 'Shipping config updated', shipping });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  getShippingConfig,
  updateShippingConfig
};
