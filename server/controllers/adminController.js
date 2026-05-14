const mockDb = require('../mockDb');

const getAllOrders = async (req, res) => {
  try {
    const orders = mockDb.getAllOrders();
    // Sort by createdAt descending
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

    const order = mockDb.updateOrder(req.params.id, { status });

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

    const product = {
      id: Date.now().toString(),
      name,
      category,
      price,
      stock,
      image,
      description,
      sizesAvailable
    };

    mockDb.products.push(product);
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, category, price, stock, image, description, sizesAvailable } = req.body;

    const product = mockDb.updateProduct(req.params.id, { 
      name, category, price, stock, image, description, sizesAvailable 
    });

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
    const index = mockDb.products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    mockDb.products.splice(index, 1);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = mockDb.users.map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
    res.json(users);
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
  getAllUsers
};
