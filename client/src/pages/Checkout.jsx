import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import createAxiosInstance from '../api/axiosInstance';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    paymentMethod: 'COD',
    gcashReferenceNumber: '',
    gcashScreenshot: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchShippingCost = async () => {
      try {
        const api = createAxiosInstance(token);
        const response = await api.get('/admin/shipping');
        setShippingCost(response.data.cost || 0);
      } catch (err) {
        console.error('Failed to fetch shipping cost:', err);
        setShippingCost(0);
      }
    };
    fetchShippingCost();
  }, [token]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    if (formData.paymentMethod === 'GCash') {
      if (!formData.gcashReferenceNumber.trim()) {
        newErrors.gcashReferenceNumber = 'GCash reference number is required';
      } else if (!/^\d{13}$/.test(formData.gcashReferenceNumber)) {
        newErrors.gcashReferenceNumber = 'Please enter a valid 13-digit GCash reference number';
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const api = createAxiosInstance(token);

      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,
          qty: item.quantity,
          selectedSize: item.selectedSize,
          price: item.product.price
        })),
        totalAmount: getTotalPrice() + shippingCost,
        paymentMethod: formData.paymentMethod,
        ...(formData.paymentMethod === 'GCash' && {
          gcashReferenceNumber: formData.gcashReferenceNumber,
          ...(formData.gcashScreenshot && {
            gcashScreenshot: 'screenshot-uploaded'
          })
        }),
        address: formData.address,
        phone: formData.phone
      };

      const response = await api.post('/orders', orderData);

      // Clear cart and navigate
      clearCart();
      navigate('/my-orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-8">
          CHECKOUT
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Delivery Address */}
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Delivery Address</h2>

            <div className="mb-4">
              <label className="block text-pink-500 font-bold mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your delivery address"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                rows="3"
              />
              {errors.address && (
                <p className="text-pink-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-pink-500 font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09XX-XXX-XXXX"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
              />
              {errors.phone && (
                <p className="text-pink-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Payment Method</h2>

            <div className="space-y-4 mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === 'COD'}
                  onChange={handleChange}
                  className="w-4 h-4 text-cyan-400"
                />
                <span className="ml-3 text-white font-semibold">Cash on Delivery (COD)</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="GCash"
                  checked={formData.paymentMethod === 'GCash'}
                  onChange={handleChange}
                  className="w-4 h-4 text-cyan-400"
                />
                <span className="ml-3 text-white font-semibold">GCash</span>
              </label>
            </div>

            {/* GCash Details */}
            {formData.paymentMethod === 'GCash' && (
              <div className="bg-purple-700 border-2 border-cyan-400 rounded-lg p-4 space-y-4">
                <div>
                  <p className="text-gray-300 mb-2">📲 Scan the QR code or send payment to:</p>
                  <p className="text-cyan-400 font-bold text-lg">09XX-XXX-XXXX</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Enter your 13-digit reference number below after sending payment
                  </p>
                </div>

                <div>
                  <label className="block text-pink-500 font-bold mb-2">
                    GCash Reference Number
                  </label>
                  <input
                    type="text"
                    name="gcashReferenceNumber"
                    value={formData.gcashReferenceNumber}
                    onChange={handleChange}
                    placeholder="13-digit reference number"
                    maxLength="13"
                    className="w-full bg-purple-600 border-2 border-pink-500 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 font-mono text-lg tracking-wider"
                  />
                  {errors.gcashReferenceNumber && (
                    <p className="text-pink-500 text-sm mt-1">
                      {errors.gcashReferenceNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-pink-500 font-bold mb-2">
                    📸 Payment Proof (Optional)
                  </label>
                  <input
                    type="file"
                    name="gcashScreenshot"
                    onChange={handleChange}
                    accept="image/*"
                    className="w-full bg-purple-600 border-2 border-cyan-400 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-pink-500 file:bg-pink-500 file:text-white file:border-0 file:px-3 file:py-1 file:rounded file:cursor-pointer"
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    Upload a screenshot of your GCash payment (PNG, JPG)
                  </p>
                  {formData.gcashScreenshot && (
                    <p className="text-cyan-400 text-sm mt-2">
                      ✓ {formData.gcashScreenshot.name}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₱{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₱{shippingCost.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-600 pt-4 flex justify-between text-lg font-bold">
                <span className="text-cyan-400">Total:</span>
                <span className="text-pink-500">₱{(getTotalPrice() + shippingCost).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500 bg-opacity-20 border-2 border-red-500 text-red-400 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Complete Order'}
          </button>
        </form>
      </div>
    </main>
  );
}
