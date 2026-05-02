import axios from 'axios';

// Create an axios instance
const api = axios.create({
  // Because we set up a proxy in vite.config.js, 
  // we just need the prefix '/api'
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the JWT token in every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;