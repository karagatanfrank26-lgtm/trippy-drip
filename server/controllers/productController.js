const mockDb = require('../mockDb');

const getProducts = async (req, res) => {
  try {
    const products = mockDb.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = mockDb.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getProducts, getProductById };
