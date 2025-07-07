// utils/auth.js
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const getToken = async () => {
  try {
    const res = await axios.post(`${api}/auth/login`, {
      email: "testregister130625@test.com",
      password: "passwordtest",
    });

    const token = res.data?.data.accessToken;

    localStorage.setItem("authToken", token); // penting!
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // penting!

    console.log("✅ Token baru di-set:", token);
  } catch (err) {
    console.error("❌ Gagal ambil token bypass:", err);
    return null;
  }
};
