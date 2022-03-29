import { useState } from 'react';

const Login = () => {
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
      submitError: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    let newErrors = {
      password: '',
      submitError: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setPassword(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let updatedErrors = {};
    if (!username.trim() && !password.trim()) {
      updatedErrors = {
        username: 'Username is requried with at least 1 character',
        password: 'Password is requried with at least 8 characters',
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
    const user = { username, password };
    console.log(user);
  };

  return (
    <>
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

        <input type='submit' value='Submit' className='button input__submit' />
      </form>
    </>
  );
};

export default Login;