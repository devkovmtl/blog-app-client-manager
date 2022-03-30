import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ auth, redirectPath = '/login', children }) => {
  if (!auth || !auth?.token) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
