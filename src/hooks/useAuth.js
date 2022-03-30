import { useState } from 'react';

const useAuth = () => {
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    const auth = {
      token,
      user: { ...user },
    };
    return auth || undefined;
  };

  const [auth, setAuth] = useState(getUser());

  const saveAuth = (credentials) => {
    localStorage.setItem('user', JSON.stringify(credentials.user));
    localStorage.setItem('token', JSON.stringify(credentials.token));
    setAuth((prevState) => ({
      ...prevState,
      token: credentials.token,
      user: {
        ...credentials.user,
      },
    }));
  };

  const removeAuth = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuth(null);
  };

  return { auth, saveAuth, removeAuth };
};

export default useAuth;
