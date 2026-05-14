import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 border-b-2 border-pink-500 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 animate-pulse">
              ◆ TRIPPY
            </div>
            <div className="text-xs font-bold text-cyan-400">DRIP</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/shop" className="text-gray-300 hover:text-pink-500 transition font-semibold">
              Shop
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-pink-500 transition font-semibold">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-pink-500 transition font-semibold">
              Contact
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <div className="text-2xl text-cyan-400 hover:text-pink-500 transition">
                🛒
              </div>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Auth Links */}
            {user ? (
              <div className="flex gap-4 items-center">
                <Link to="/my-orders" className="text-gray-300 hover:text-cyan-400 transition font-semibold">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="bg-pink-500 text-white px-3 py-2 rounded-lg hover:bg-pink-600 transition font-semibold text-sm">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition font-semibold">
                  Login
                </Link>
                <Link to="/register" className="bg-cyan-500 text-purple-900 px-4 py-2 rounded-lg hover:bg-cyan-400 transition font-bold">
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-pink-500 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 bg-purple-900 bg-opacity-50 p-4 rounded-lg">
            <Link to="/shop" className="text-cyan-400 font-semibold hover:text-pink-500">
              Shop
            </Link>
            <Link to="/about" className="text-cyan-400 font-semibold hover:text-pink-500">
              About
            </Link>
            <Link to="/contact" className="text-cyan-400 font-semibold hover:text-pink-500">
              Contact
            </Link>
            <Link to="/cart" className="text-cyan-400 font-semibold hover:text-pink-500">
              Cart ({getTotalItems()})
            </Link>
            {user ? (
              <>
                <Link to="/my-orders" className="text-cyan-400 font-semibold hover:text-pink-500">
                  My Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-pink-500 font-semibold hover:text-cyan-400">
                    Admin Panel
                  </Link>
                )}
                <button onClick={logout} className="text-pink-500 font-semibold hover:text-cyan-400 text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-cyan-400 font-semibold hover:text-pink-500">
                  Login
                </Link>
                <Link to="/register" className="text-pink-500 font-semibold hover:text-cyan-400">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
