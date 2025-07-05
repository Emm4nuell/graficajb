import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Ou um spinner de carregando
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
