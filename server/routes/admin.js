const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const {
  getAllOrders,
  updateOrderStatus,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllUsers
} = require('../controllers/adminController');

// Orders management
router.get('/orders', authMiddleware, adminMiddleware, getAllOrders);
router.put('/orders/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

// Products management
router.post('/products', authMiddleware, adminMiddleware, addProduct);
router.put('/products/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, deleteProduct);

// Users management
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;
