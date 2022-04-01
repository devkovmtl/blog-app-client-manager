import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

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
  const [decodedJwtToken, setDecodedJwtToken] = useState();
  const [timer, setTimer] = useState();

  const saveAuth = (credentials) => {
    localStorage.setItem('user', JSON.stringify(credentials.user));
    localStorage.setItem('token', JSON.stringify(credentials.token));

    setDecodedJwtToken(jwtDecode(credentials.token));

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
    setDecodedJwtToken(null);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('token'))) {
      setDecodedJwtToken(jwtDecode(JSON.parse(localStorage.getItem('token'))));
    }
  }, []);

  useEffect(() => {
    let interval;
    if (decodedJwtToken) {
      interval = setInterval(() => {
        setTimer(decodedJwtToken.exp * 1000 - new Date().getTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [decodedJwtToken, timer]);

  return { auth, saveAuth, removeAuth, timer };
};

export default useAuth;
