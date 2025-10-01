import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    toast.error("Please verify your email first");
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

export default ProtectedRoute;
