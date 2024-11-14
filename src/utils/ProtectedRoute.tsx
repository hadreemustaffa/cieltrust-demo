import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = () => {
  const auth = useAuth();
  if (!auth.isAuthenticated) return <Navigate to="/login/" />;
  return <Outlet />;
};

export default ProtectedRoute;
