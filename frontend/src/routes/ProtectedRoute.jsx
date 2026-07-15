import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIsAuthenticated } from "../hooks";
import { Loading } from "../components";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useIsAuthenticated();
  const location = useLocation();

  if (isLoading) return <Loading />

  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
