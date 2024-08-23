import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  element: ReactElement;
}

function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { isLogin } = useAuth();

  return isLogin ? element : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
