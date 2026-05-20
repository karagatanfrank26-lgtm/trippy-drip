const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['T-Shirts', 'Hoodies', 'Accessories', 'Shorts'], 
    required: true 
  },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  image: { type: String, required: true }, // Cloudinary URL
  description: { type: String, required: true },
  sizesAvailable: { 
    type: [String], 
    enum: ['S', 'M', 'L', 'XL'],
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
