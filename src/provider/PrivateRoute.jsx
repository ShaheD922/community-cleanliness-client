import { useContext } from "react";
import { Navigate, useLocation } from "react-router"; // ✅ fix
import { AuthContext } from "./AuthProvider";
import LoadingPage from "../Components/LoadingPage";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p className="text-center mt-10"><LoadingPage></LoadingPage></p>;

  if (!user) return <Navigate to="/auth/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
