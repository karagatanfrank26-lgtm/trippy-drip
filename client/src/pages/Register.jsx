import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import createAxiosInstance from '../api/axiosInstance';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const api = createAxiosInstance();
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phone
      });

      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
            JOIN US
          </h1>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border-2 border-red-500 text-red-400 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-pink-500 font-bold mb-1 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition text-sm"
              />
              {errors.name && <p className="text-pink-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-pink-500 font-bold mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition text-sm"
              />
              {errors.email && <p className="text-pink-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-pink-500 font-bold mb-1 text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition text-sm"
              />
              {errors.password && <p className="text-pink-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-pink-500 font-bold mb-1 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-pink-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-pink-500 font-bold mb-1 text-sm">Address (Optional)</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your Address"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition text-sm"
              />
            </div>

            <div>
              <label className="block text-pink-500 font-bold mb-1 text-sm">Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09XX-XXX-XXXX"
                className="w-full bg-purple-700 border-2 border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-pink-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-4">
            Already a tripper?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-pink-500 font-bold transition">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
