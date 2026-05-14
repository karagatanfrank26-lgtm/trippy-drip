import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const createAxiosInstance = (token) => {
  let apiUrl;
  
  // Determine API URL based on environment
  if (import.meta.env.VITE_API_URL) {
    apiUrl = import.meta.env.VITE_API_URL.replace(/[./]+$/, '');
  } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Development environment
    apiUrl = 'http://localhost:5000';
  } else {
    // Production environment - use Render backend
    apiUrl = 'https://trippy-drip.onrender.com';
  }
  
  const instance = axios.create({
    baseURL: `${apiUrl}/api`
  });

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return instance;
};

export default createAxiosInstance;
