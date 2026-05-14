import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-950 flex items-center justify-center">
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
