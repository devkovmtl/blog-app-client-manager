import { Navigate } from 'react-router-dom';

const UserIsLoggedIn = ({ auth, redirectPath = '/', children }) => {
  if (auth && auth.token) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default UserIsLoggedIn;
