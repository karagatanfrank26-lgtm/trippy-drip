const mongoose = require('mongoose');

const shippingConfigSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Standard Shipping' },
  cost: { type: Number, required: true, min: 0, default: 100 },
  estimatedDays: { type: Number, required: true, default: 3 },
  description: { type: String },
  isDefault: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

shippingConfigSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ShippingConfig', shippingConfigSchema);
