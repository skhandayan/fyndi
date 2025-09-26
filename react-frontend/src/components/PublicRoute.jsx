import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/home" replace /> 
  }

  return children;

};

export default PublicRoute