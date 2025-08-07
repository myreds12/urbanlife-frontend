// src/utils/apiClient.js
import axios from "axios";
import { useAuthStore } from "../Auth/AuthStore.js";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ambil token dari localStorage jika ada
apiClient.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
