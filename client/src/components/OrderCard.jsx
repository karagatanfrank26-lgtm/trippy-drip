import React from 'react';

const statusColors = {
  Pending: 'bg-yellow-500 bg-opacity-20 text-yellow-400',
  Confirmed: 'bg-blue-500 bg-opacity-20 text-blue-400',
  Shipped: 'bg-orange-500 bg-opacity-20 text-orange-400',
  Delivered: 'bg-green-500 bg-opacity-20 text-green-400',
  Cancelled: 'bg-red-500 bg-opacity-20 text-red-400'
};

export default function OrderCard({ order }) {
  return (
    <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-6 hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-cyan-400">Order #{order._id?.slice(-8) || 'N/A'}</h3>
          <p className="text-gray-400 text-sm">
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>

      {/* Items */}
      <div className="mb-4 bg-purple-700 bg-opacity-50 rounded p-3">
        <p className="text-pink-500 font-bold text-sm mb-2">Items:</p>
        {order.items.map((item, idx) => (
          <div key={idx} className="text-gray-300 text-sm flex justify-between mb-1">
            <span>{item.product?.name || 'Product'} (Size: {item.selectedSize}) × {item.qty}</span>
            <span className="text-cyan-400">₱{(item.price * item.qty).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-400">Payment Method</p>
          <p className="text-cyan-400 font-bold">{order.paymentMethod}</p>
        </div>
        <div>
          <p className="text-gray-400">Delivery Address</p>
          <p className="text-cyan-400 font-bold text-xs">{order.address}</p>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-600 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-bold">Total Amount:</span>
          <span className="text-2xl font-black text-cyan-400">
            ₱{order.totalAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
