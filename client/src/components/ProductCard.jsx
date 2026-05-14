import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setShowModal(false);
    setSelectedSize('M');
    setQuantity(1);
  };

  return (
    <>
      <div className="group relative bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg overflow-hidden border-2 border-pink-500 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-pink-500/50">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="inline-block bg-cyan-500 bg-opacity-20 text-cyan-400 text-xs font-bold px-2 py-1 rounded mb-2">
                {product.category}
              </span>
              <h3 className="font-bold text-white text-lg group-hover:text-pink-500 transition">
                {product.name}
              </h3>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-black text-cyan-400">
              ₱{product.price.toLocaleString()}
            </div>
            <div className={`text-xs font-bold px-2 py-1 rounded ${
              product.stock > 5 
                ? 'bg-green-500 bg-opacity-20 text-green-400'
                : product.stock > 0
                ? 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                : 'bg-red-500 bg-opacity-20 text-red-400'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
              product.stock === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg hover:shadow-pink-500/50 hover:scale-105'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Add to Cart Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 border-2 border-pink-500 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">{product.name}</h3>

            {/* Size Selection */}
            <div className="mb-4">
              <label className="block text-pink-500 font-bold mb-2">Size</label>
              <div className="flex gap-2">
                {product.sizesAvailable.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-bold transition ${
                      selectedSize === size
                        ? 'bg-cyan-500 text-purple-900'
                        : 'bg-purple-700 text-cyan-400 hover:bg-purple-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <label className="block text-pink-500 font-bold mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-purple-700 text-cyan-400 px-3 py-2 rounded-lg hover:bg-purple-600 font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="bg-purple-700 text-white w-16 px-3 py-2 rounded-lg text-center font-bold"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="bg-purple-700 text-cyan-400 px-3 py-2 rounded-lg hover:bg-purple-600 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="mb-6 bg-purple-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total:</span>
                <span className="text-2xl font-black text-cyan-400">
                  ₱{(product.price * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-purple-700 text-pink-500 py-2 rounded-lg font-bold hover:bg-purple-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-pink-500/50 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
