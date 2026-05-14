import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import createAxiosInstance from '../api/axiosInstance';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const api = createAxiosInstance();
      const response = await api.post('/auth/login', formData);

      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-2">
            ◆ TRIPPY DRIP
          </div>
          <p className="text-cyan-400 font-bold">Mind Melt Guaranteed</p>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-pink-500 p-8 backdrop-blur-md">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-6 text-center">
            LOGIN
          </h1>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border-2 border-red-500 text-red-400 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-pink-500 font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-pink-500 font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-pink-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-pink-500 font-bold transition">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
