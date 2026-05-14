import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import { useAuth } from '../context/AuthContext';
import createAxiosInstance from '../api/axiosInstance';

export default function MyOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const api = createAxiosInstance(token);
        const response = await api.get('/orders/my-orders');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-8">
          MY ORDERS
        </h1>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg mb-4">No orders yet. Start shopping!</p>
            <a href="/shop" className="text-pink-500 hover:text-cyan-400 font-bold">
              Browse Products →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
