import { useAuth } from '@/auth/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthLoading, user, authError } = useAuth();

  if (isAuthLoading) {
    return <div>Загрузка...</div>;
  }
  if (authError) {
    return <div>Ошибка - {authError}</div>;
  }
  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
