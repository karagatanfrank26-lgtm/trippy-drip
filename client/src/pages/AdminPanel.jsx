import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import createAxiosInstance from '../api/axiosInstance';

export default function AdminPanel() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0 });
  const [shippingConfig, setShippingConfig] = useState({ cost: 100, estimatedDays: 3 });

  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'T-Shirts',
    price: '',
    stock: '',
    image: '',
    description: '',
    sizesAvailable: ['M']
  });

  // Shipping Form State
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingForm, setShippingForm] = useState({ cost: 100, estimatedDays: 3, name: 'Standard Shipping' });

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'shipping') fetchShippingConfig();
    if (activeTab === 'dashboard') fetchDashboard();
  }, [activeTab]);

  const fetchDashboard = async () => {
    try {
      const api = createAxiosInstance(token);
      const ordersResponse = await api.get('/admin/orders');
      const orders = ordersResponse.data;

      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const pendingOrders = orders.filter(o => o.status === 'Pending').length;

      setStats({ totalOrders, totalRevenue, pendingOrders });
    } catch (err) {
      console.error('Failed to fetch dashboard:', err);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const api = createAxiosInstance(token);
      const response = await api.get('/admin/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const api = createAxiosInstance(token);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const api = createAxiosInstance(token);
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchShippingConfig = async () => {
    try {
      const api = createAxiosInstance(token);
      const response = await api.get('/admin/shipping');
      setShippingConfig(response.data);
      setShippingForm({
        cost: response.data.cost,
        estimatedDays: response.data.estimatedDays,
        name: response.data.name
      });
    } catch (err) {
      console.error('Failed to fetch shipping config:', err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const api = createAxiosInstance(token);
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error('Failed to update order:', err);
      alert('Failed to update order');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const api = createAxiosInstance(token);
      if (editingProductId) {
        await api.put(`/admin/products/${editingProductId}`, newProduct);
        alert('✅ Product updated successfully!');
      } else {
        await api.post('/admin/products', newProduct);
        alert('✅ Product added successfully!');
      }
      setNewProduct({
        name: '',
        category: 'T-Shirts',
        price: '',
        stock: '',
        image: '',
        description: '',
        sizesAvailable: ['M']
      });
      setEditingProductId(null);
      setShowProductForm(false);
      fetchProducts();
    } catch (err) {
      console.error('Failed to save product:', err);
      alert('❌ Failed to save product');
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditingProductId(product._id);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const api = createAxiosInstance(token);
        await api.delete(`/admin/products/${productId}`);
        alert('✅ Product deleted successfully!');
        fetchProducts();
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('❌ Failed to delete product');
      }
    }
  };

  const handleUpdateShipping = async (e) => {
    e.preventDefault();
    try {
      const api = createAxiosInstance(token);
      await api.put('/admin/shipping', shippingForm);
      alert('✅ Shipping configuration updated successfully!');
      fetchShippingConfig();
      setShowShippingForm(false);
    } catch (err) {
      console.error('Failed to update shipping:', err);
      alert('❌ Failed to update shipping configuration');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-8">
          ADMIN PANEL
        </h1>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {['dashboard', 'orders', 'products', 'shipping', 'users'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-cyan-500 text-purple-900'
                  : 'bg-purple-800 text-cyan-400 hover:bg-purple-700'
              }`}
            >
              {tab === 'dashboard' && '📊'}
              {tab === 'orders' && '📦'}
              {tab === 'products' && '🛍️'}
              {tab === 'shipping' && '🚚'}
              {tab === 'users' && '👥'}
              {' ' + tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6">
              <h3 className="text-gray-400 font-bold mb-2">Total Orders</h3>
              <p className="text-4xl font-black text-cyan-400">{stats.totalOrders}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6">
              <h3 className="text-gray-400 font-bold mb-2">Total Revenue</h3>
              <p className="text-4xl font-black text-pink-500">₱{stats.totalRevenue.toLocaleString()}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6">
              <h3 className="text-gray-400 font-bold mb-2">Pending Orders</h3>
              <p className="text-4xl font-black text-yellow-400">{stats.pendingOrders}</p>
            </div>
          </div>
        )}

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Orders Management</h2>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-400">No orders yet</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left text-pink-500 font-bold py-2">Order ID</th>
                    <th className="text-left text-pink-500 font-bold py-2">Customer</th>
                    <th className="text-left text-pink-500 font-bold py-2">Total</th>
                    <th className="text-left text-pink-500 font-bold py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} className="border-b border-gray-600 hover:bg-purple-700 transition">
                      <td className="text-cyan-400 py-3">{order._id.slice(-8)}</td>
                      <td className="text-gray-300 py-3">{order.user?.name || 'Unknown'}</td>
                      <td className="text-gray-300 py-3">₱{order.totalAmount?.toLocaleString() || '0'}</td>
                      <td className="py-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="bg-purple-700 border border-cyan-400 text-white px-2 py-1 rounded"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div>
            <button
              onClick={() => {
                setEditingProductId(null);
                setNewProduct({
                  name: '',
                  category: 'T-Shirts',
                  price: '',
                  stock: '',
                  image: '',
                  description: '',
                  sizesAvailable: ['M']
                });
                setShowProductForm(!showProductForm);
              }}
              className="mb-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transition"
            >
              {showProductForm ? '✕ Cancel' : '+ Add New Product'}
            </button>

            {showProductForm && (
              <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6 mb-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  {editingProductId ? '✏️ Edit Product' : '➕ Add New Product'}
                </h3>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white placeholder-gray-400"
                    required
                  />
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white"
                  >
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price (₱)"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || '' })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white placeholder-gray-400"
                    required
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || '' })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white placeholder-gray-400"
                    required
                    min="0"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white placeholder-gray-400"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white placeholder-gray-400"
                    rows="3"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded font-bold hover:shadow-lg transition"
                  >
                    {editingProductId ? 'Update Product' : 'Add Product'}
                  </button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product._id} className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-4 hover:border-pink-500 transition">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
                  <h4 className="font-bold text-cyan-400 mb-2">{product.name}</h4>
                  <p className="text-gray-300 text-sm mb-1">💰 ₱{product.price.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs mb-4">📦 Stock: {product.stock}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 bg-cyan-500 text-purple-900 font-bold py-2 rounded hover:bg-cyan-400 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex-1 bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Configuration */}
        {activeTab === 'shipping' && (
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">🚚 Shipping Configuration</h2>

            <div className="bg-gradient-to-br from-purple-700 to-purple-800 rounded-lg border border-cyan-400 p-6 mb-6">
              <h3 className="text-lg font-bold text-pink-500 mb-4">Current Settings</h3>
              <div className="space-y-3">
                <p className="text-gray-300"><span className="font-bold text-cyan-400">Method:</span> {shippingConfig.name}</p>
                <p className="text-gray-300"><span className="font-bold text-cyan-400">Cost:</span> ₱{shippingConfig.cost}</p>
                <p className="text-gray-300"><span className="font-bold text-cyan-400">Estimated Delivery:</span> {shippingConfig.estimatedDays} days</p>
              </div>
            </div>

            {!showShippingForm ? (
              <button
                onClick={() => setShowShippingForm(true)}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
              >
                ✏️ Edit Shipping Cost
              </button>
            ) : (
              <form onSubmit={handleUpdateShipping} className="space-y-4">
                <input
                  type="text"
                  placeholder="Shipping Method Name"
                  value={shippingForm.name}
                  onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                  className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white placeholder-gray-400"
                  required
                />
                <input
                  type="number"
                  placeholder="Shipping Cost (₱)"
                  value={shippingForm.cost}
                  onChange={(e) => setShippingForm({ ...shippingForm, cost: parseFloat(e.target.value) || '' })}
                  className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white placeholder-gray-400"
                  required
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Estimated Days"
                  value={shippingForm.estimatedDays}
                  onChange={(e) => setShippingForm({ ...shippingForm, estimatedDays: parseInt(e.target.value) || '' })}
                  className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white placeholder-gray-400"
                  required
                  min="1"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded font-bold hover:shadow-lg transition"
                  >
                    💾 Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowShippingForm(false)}
                    className="flex-1 bg-gray-600 text-white py-2 rounded font-bold hover:bg-gray-700 transition"
                  >
                    ✕ Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Users Management</h2>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : users.length === 0 ? (
              <p className="text-gray-400">No users found</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left text-pink-500 font-bold py-2">Name</th>
                    <th className="text-left text-pink-500 font-bold py-2">Email</th>
                    <th className="text-left text-pink-500 font-bold py-2">Role</th>
                    <th className="text-left text-pink-500 font-bold py-2">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b border-gray-600 hover:bg-purple-700 transition">
                      <td className="text-cyan-400 py-3">{user.name}</td>
                      <td className="text-gray-300 py-3">{user.email}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          user.role === 'admin'
                            ? 'bg-pink-500 text-white'
                            : 'bg-purple-700 text-cyan-400'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="text-gray-300 py-3">{user.phone || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
      });
      setShowProductForm(false);
      fetchProducts();
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-8">
          ADMIN PANEL
        </h1>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {['dashboard', 'orders', 'products', 'users'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-cyan-500 text-purple-900'
                  : 'bg-purple-800 text-cyan-400 hover:bg-purple-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6">
              <h3 className="text-gray-400 font-bold mb-2">Total Orders</h3>
              <p className="text-4xl font-black text-cyan-400">{stats.totalOrders}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6">
              <h3 className="text-gray-400 font-bold mb-2">Total Revenue</h3>
              <p className="text-4xl font-black text-pink-500">₱{stats.totalRevenue.toLocaleString()}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6">
              <h3 className="text-gray-400 font-bold mb-2">Pending Orders</h3>
              <p className="text-4xl font-black text-yellow-400">{stats.pendingOrders}</p>
            </div>
          </div>
        )}

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Orders</h2>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left text-pink-500 font-bold py-2">Order ID</th>
                    <th className="text-left text-pink-500 font-bold py-2">Customer</th>
                    <th className="text-left text-pink-500 font-bold py-2">Total</th>
                    <th className="text-left text-pink-500 font-bold py-2">Status</th>
                    <th className="text-left text-pink-500 font-bold py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} className="border-b border-gray-600 hover:bg-purple-700 transition">
                      <td className="text-cyan-400 py-3">{order._id.slice(-8)}</td>
                      <td className="text-gray-300 py-3">{order.user?.name || 'Unknown'}</td>
                      <td className="text-gray-300 py-3">₱{order.totalAmount.toLocaleString()}</td>
                      <td className="py-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="bg-purple-700 border border-cyan-400 text-white px-2 py-1 rounded"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div>
            <button
              onClick={() => setShowProductForm(!showProductForm)}
              className="mb-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg"
            >
              {showProductForm ? 'Cancel' : '+ Add Product'}
            </button>

            {showProductForm && (
              <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6 mb-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white"
                    required
                  />
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white"
                  >
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price (₱)"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Image URL (Cloudinary)"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full bg-purple-700 border-2 border-cyan-400 rounded px-3 py-2 text-white"
                    rows="3"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded font-bold hover:shadow-lg"
                  >
                    Add Product
                  </button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product._id} className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-cyan-400 p-4">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
                  <h4 className="font-bold text-cyan-400 mb-2">{product.name}</h4>
                  <p className="text-gray-300 text-sm mb-2">₱{product.price}</p>
                  <p className="text-gray-400 text-xs mb-3">Stock: {product.stock}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Users</h2>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left text-pink-500 font-bold py-2">Name</th>
                    <th className="text-left text-pink-500 font-bold py-2">Email</th>
                    <th className="text-left text-pink-500 font-bold py-2">Role</th>
                    <th className="text-left text-pink-500 font-bold py-2">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b border-gray-600 hover:bg-purple-700 transition">
                      <td className="text-cyan-400 py-3">{user.name}</td>
                      <td className="text-gray-300 py-3">{user.email}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          user.role === 'admin'
                            ? 'bg-pink-500 text-white'
                            : 'bg-purple-700 text-cyan-400'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="text-gray-300 py-3">{user.phone || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
