const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true, min: 1 },
    selectedSize: { type: String, enum: ['S', 'M', 'L', 'XL'], required: true },
    price: { type: Number, required: true } // Price at time of order
  }],
  totalAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, enum: ['COD', 'GCash'], required: true },
  gcashReferenceNumber: { 
    type: String,
    validate: {
      validator: function(value) {
        // Required if paymentMethod is GCash, optional otherwise
        if (this.paymentMethod === 'GCash') {
          return value && /^\d{13}$/.test(value);
        }
        return true;
      },
      message: 'GCash reference number must be exactly 13 digits'
    }
  },
  gcashScreenshot: { type: String }, // Optional Cloudinary URL
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
