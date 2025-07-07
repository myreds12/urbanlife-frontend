// src/utils/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Ambil token dari localStorage jika ada
const token = localStorage.getItem("authToken");
if (token) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default apiClient;
