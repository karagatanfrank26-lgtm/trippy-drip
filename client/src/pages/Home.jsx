import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import createAxiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = createAxiosInstance(token);
        const response = await api.get('/products');
        setProducts(response.data.slice(0, 6)); // Show 6 products
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 animate-pulse">
            ◆ HIGH TRIPPY MIND'S DRIP ◆
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-cyan-400 mb-8">
            Mind Melt Guaranteed™
          </p>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Experience premium streetwear for the tripped-out soul. Limited drops. Maximum vibes.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105"
          >
            Explore New Drops 🚀
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-2">
            NEW TRIPPY DROPS
          </h2>
          <div className="h-1 bg-gradient-to-r from-pink-500 to-cyan-400 w-24 mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block bg-cyan-500 text-purple-900 px-8 py-3 rounded-lg font-bold hover:bg-cyan-400 transition"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-700 py-16 my-20 mx-4 rounded-lg border-2 border-cyan-400">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            LIMITED BUNDLE DROPS
          </h3>
          <p className="text-gray-100 mb-6 text-lg">
            Get 3 pieces for only ₱2,999. Limited quantities available. First come, first served.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-pink-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Shop Bundle
          </Link>
        </div>
      </section>
    </main>
  );
}
