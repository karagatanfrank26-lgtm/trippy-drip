import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const createAxiosInstance = (token) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  });

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return instance;
};

export default createAxiosInstance;
