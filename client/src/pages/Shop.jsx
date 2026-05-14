import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import createAxiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['All', 'T-Shirts', 'Hoodies', 'Accessories'];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = createAxiosInstance(token);
        const response = await api.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-4">
            SHOP THE DRIP
          </h1>
          <p className="text-gray-300">Discover our curated collection of premium streetwear</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 mb-4"
          />

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-purple-900'
                    : 'bg-purple-700 text-cyan-400 hover:bg-purple-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-cyan-400 font-bold">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-2 text-white focus:outline-none"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="text-center mt-12 text-gray-400">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        )}
      </div>
    </main>
  );
}
