const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, gcashReferenceNumber, address, phone } = req.body;

    // Validate GCash reference number if payment method is GCash
    if (paymentMethod === 'GCash') {
      if (!gcashReferenceNumber || !/^\d{13}$/.test(gcashReferenceNumber)) {
        return res.status(400).json({ 
          message: 'GCash reference number must be exactly 13 digits' 
        });
      }
    }

    // Validate items and check stock
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.qty) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
    }

    // Create order
    let order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      paymentMethod,
      gcashReferenceNumber: paymentMethod === 'GCash' ? gcashReferenceNumber : undefined,
      address,
      phone,
      status: 'Pending'
    });
    order = await order.save();

    // Reduce stock for each item
    for (let item of items) {
      const product = await Product.findById(item.product);
      product.stock -= item.qty;
      await product.save();
    }

    res.status(201).json({ 
      message: 'Order created successfully',
      order: order
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createOrder, getMyOrders };
