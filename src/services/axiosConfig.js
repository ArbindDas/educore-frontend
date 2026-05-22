// services/axiosConfig.js
import axios from 'axios';



const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000/api/',
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor - Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        // const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        //   refresh: refreshToken
        // });


        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/token/refresh/`, {
          refresh:refreshToken
        })
        
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        // Refresh failed - redirect to login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;