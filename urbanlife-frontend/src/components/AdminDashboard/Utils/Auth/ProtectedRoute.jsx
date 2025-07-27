import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./AuthStore";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((s) => s.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Cek apakah token sudah expired
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      // Token expired, hapus dari store
      useAuthStore.getState().logout();
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  } catch (err) {
    console.error("Token invalid:", err);
    useAuthStore.getState().logout();
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
