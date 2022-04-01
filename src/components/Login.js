import { useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_DEV_URL } from '../constant';
import UserContent from '../context/UserContext';
import Loader from './Loader';

const Login = () => {
  const { saveAuth } = useContext(UserContent);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    submitErrors: '',
  });

  const handleUsernameChange = (e) => {
    let newErrors = {
      username: '',
      submitErrors: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    let newErrors = {
      password: '',
      submitErrors: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setPassword(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let updatedErrors = {};
    if (!username.trim() && !password.trim()) {
      updatedErrors = {
        username: 'Username is required with at least 1 character',
        password: 'Password is required with at least 8 characters',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
      return;
    }

    if (!username.trim()) {
      updatedErrors = {
        username: 'Username is required with at least 1 character',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
      return;
    }

    if (!password.trim() || password.length < 8) {
      updatedErrors = {
        password: 'Password is required with at least 8 characters',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
      return;
    }
    const userData = { username, password };

    try {
      setIsLoading(true);
      const response = await axios.post(
        SERVER_DEV_URL + 'auth/login',
        userData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.token) {
        setIsLoading(false);
        saveAuth(response.data);
      } else {
        setIsLoading(false);
        updatedErrors = {
          submitErrors: response.data.message || 'Error. Try Again',
        };
        setErrors((prevState) => ({
          ...prevState,
          ...updatedErrors,
        }));
      }
    } catch (error) {
      setIsLoading(false);
      updatedErrors = {
        submitErrors: 'Error. Try Again',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form className='form form__login' onSubmit={submitForm} noValidate>
          <h1 style={{ textAlign: 'center' }}>Log In</h1>
          <div className='form__group'>
            <label
              htmlFor='username'
              className={`input-group__label ${
                errors.username ? 'input-group__label--invalide' : ''
              }`}
            >
              <span style={{ color: '#ff0000' }}>*</span>
              Username
            </label>
            <input
              type='text'
              className={`input-group__input ${
                errors.username ? 'input-group__input--invalid' : ''
              }`}
              name='username'
              id='username'
              placeholder='Username'
              value={username}
              onChange={handleUsernameChange}
            />
            {errors.username && (
              <div className='input-group--invalid-feedback'>
                <p>{errors.username}</p>
              </div>
            )}
          </div>

          <div className='form__group'>
            <label
              htmlFor='password'
              className={`input-group__label ${
                errors.password ? 'input-group__label--invalid' : ''
              }`}
            >
              <span style={{ color: '#ff0000' }}>*</span>
              Password
            </label>
            <input
              type='password'
              className={`input-group__input ${
                errors.password ? 'input-group__input--invalid' : ''
              }`}
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <div className='input-group--invalid-feedback'>
                <p>{errors.password}</p>
              </div>
            )}
          </div>
          {errors.submitErrors ? (
            <p style={{ textAlign: 'center', fontSize: '14px', color: 'red' }}>
              {errors.submitErrors}
            </p>
          ) : null}
          <input
            type='submit'
            value='Submit'
            className='button input__submit'
          />
        </form>
      )}
    </>
  );
};

export default Login;
