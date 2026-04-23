import axios from 'axios';

// Create an Axios instance pointing to our backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
});

// Add a request interceptor to automatically attach the token
api.interceptors.request.use(
  (config) => {
    // Check if we have a token saved in local storage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;