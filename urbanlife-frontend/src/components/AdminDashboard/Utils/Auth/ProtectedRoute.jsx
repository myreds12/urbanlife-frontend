import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./AuthStore";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((s) => s.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
