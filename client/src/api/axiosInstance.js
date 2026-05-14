import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const createAxiosInstance = (token) => {
  const apiUrl = import.meta.env.VITE_API_URL?.replace(/[./]+$/, '') || 'http://localhost:5000';
  const instance = axios.create({
    baseURL: `${apiUrl}/api`
  });

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return instance;
};

export default createAxiosInstance;
