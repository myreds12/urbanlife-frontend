import { useEffect } from "react";
import { useAuthStore } from "./AuthStore";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function AuthInitializer() {
  const token = useAuthStore((s) => s.token);
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (token) {
      try {
        const user = jwtDecode(token);
        const now = Date.now() / 1000;

        if (user.exp && user.exp < now) {
          // Token expired
          setToken(null);
          setUser(null);
          return;
        }
        setUser(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (err) {
        console.error("Token invalid:", err);
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  return null;
}
