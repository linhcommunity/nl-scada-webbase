import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/v1', // Vite proxy sẽ forward tới backend
  headers: { 'Content-Type': 'application/json' }
});

// Gắn token vào mọi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('scada-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý lỗi 401 → logout
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('scada-token');
      localStorage.removeItem('scada-currentSiteId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;