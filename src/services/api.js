import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },
  
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  
  getProfile: () => {
    return api.get('/auth/profile');
  },
  
  updateProfile: (userData) => {
    return api.put('/auth/profile', userData);
  }
};

// In services/api.js - Update the codeService
// In services/api.js
export const codeService = {
  generateCode: (prompt, language, includeComments = true) => {
    return api.post('/code/generate', { prompt, language, includeComments });
  },
  
  generateSQL: (prompt, databaseType) => {
    return api.post('/code/sql', { prompt, databaseType });
  }
};
// Debug services
export const debugService = {
  debugCode: (code, language, errorMessage) => {
    return api.post('/debug/debug', { code, language, errorMessage });
  },
  
  explainCode: (code, language) => {
    return api.post('/debug/explain', { code, language });
  }
};

export default api;