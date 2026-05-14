import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-purple-950 border-t-2 border-pink-500 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-4">
            ◆ TRIPPY DRIP
          </h3>
          <p className="text-gray-400 text-sm">
            Mind Melt Guaranteed. Premium streetwear for the tripped-out soul.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-cyan-400 font-bold mb-4">SHOP</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/shop" className="hover:text-pink-500 transition">T-Shirts</a></li>
            <li><a href="/shop" className="hover:text-pink-500 transition">Hoodies</a></li>
            <li><a href="/shop" className="hover:text-pink-500 transition">Accessories</a></li>
            <li><a href="/shop" className="hover:text-pink-500 transition">New Drops</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-cyan-400 font-bold mb-4">SUPPORT</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/about" className="hover:text-pink-500 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-pink-500 transition">Contact</a></li>
            <li><a href="/shop" className="hover:text-pink-500 transition">FAQs</a></li>
            <li><a href="/shop" className="hover:text-pink-500 transition">Shipping Info</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-cyan-400 font-bold mb-4">CONNECT</h4>
          <p className="text-gray-400 text-sm mb-4">📍 Quezon City, Philippines</p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="text-pink-500 hover:text-cyan-400 transition">f</a>
            <a href="#" className="text-pink-500 hover:text-cyan-400 transition">𝕏</a>
            <a href="#" className="text-pink-500 hover:text-cyan-400 transition">📷</a>
            <a href="#" className="text-pink-500 hover:text-cyan-400 transition">▶</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2024 High Trippy Mind's Drip. All rights reserved. Mind Melt Guaranteed™</p>
      </div>
    </footer>
  );
}
