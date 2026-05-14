import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-4 flex gap-4 hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
      {/* Image */}
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg border border-cyan-400"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-bold text-pink-500 text-lg">{item.product.name}</h3>
        <p className="text-cyan-400 text-sm">Size: {item.selectedSize}</p>
        <p className="text-gray-300 text-sm">Price: ₱{item.product.price.toLocaleString()}</p>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.product._id, item.selectedSize, item.quantity - 1)}
          className="bg-purple-700 text-cyan-400 px-2 py-1 rounded hover:bg-purple-600 font-bold"
        >
          −
        </button>
        <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.product._id, item.selectedSize, item.quantity + 1)}
          className="bg-purple-700 text-cyan-400 px-2 py-1 rounded hover:bg-purple-600 font-bold"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="flex flex-col items-end justify-center">
        <div className="text-cyan-400 font-bold text-lg">
          ₱{(item.product.price * item.quantity).toLocaleString()}
        </div>
        <button
          onClick={() => removeFromCart(item.product._id, item.selectedSize)}
          className="text-pink-500 text-sm font-bold hover:text-pink-400 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
