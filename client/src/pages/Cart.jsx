import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cart, clearCart, getTotalPrice } = useCart();
  const { token } = useAuth();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-8">
            YOUR CART IS EMPTY
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Time to load up on some drip! 🛒
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-pink-500/50 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-8">
          SHOPPING CART
        </h1>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cart.map((item, idx) => (
            <CartItem key={idx} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-6 mb-8">
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-gray-300">
              <span>Subtotal</span>
              <span>₱{getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Shipping</span>
              <span>₱150</span>
            </div>
            <div className="border-t border-gray-600 pt-4 flex justify-between items-center">
              <span className="text-cyan-400 font-bold text-lg">Total</span>
              <span className="text-3xl font-black text-pink-500">
                ₱{(getTotalPrice() + 150).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to="/shop"
              className="flex-1 bg-purple-700 text-cyan-400 py-3 rounded-lg font-bold hover:bg-purple-600 transition text-center"
            >
              Continue Shopping
            </Link>
            {token ? (
              <Link
                to="/checkout"
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-pink-500/50 transition text-center"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-pink-500/50 transition text-center"
              >
                Login to Checkout
              </Link>
            )}
          </div>
        </div>

        {/* Clear Cart Button */}
        <div className="text-center">
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-400 font-bold transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </main>
  );
}
