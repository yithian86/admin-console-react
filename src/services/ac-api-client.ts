import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors if needed
apiClient.interceptors.request.use(config => {
  // Add authorization token
  const token = localStorage.getItem('adminConsoleToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
