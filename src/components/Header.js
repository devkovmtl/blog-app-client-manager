import { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContent from '../context/UserContext';
import { getReturnValues } from '../utils/utils';

const Header = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const pathName = location.pathname.split('/')[1];

  const { auth, removeAuth, timer } = useContext(UserContent);

  useEffect(() => {
    const [days, hours, minutes, seconds] = getReturnValues(timer);
    // console.log(
    //   `Days ${days}, Hours ${hours}, Minutes ${minutes}, Seconds ${seconds} Left`
    // );
    const totalLeft = days + hours + minutes + seconds;
    // console.log(totalLeft);
    if (totalLeft === 0) {
      removeAuth();
    }
  }, [timer, removeAuth]);

  return (
    <header>
      <h1 className='title' onClick={() => navigate('/')}>
        Blog - Manager
      </h1>
      <span className='flex'></span>

      {auth && auth.token && (
        <nav>
          <ul className='nav'>
            <li className='nav__link'>
              <Link
                to='/'
                className={`nav__link__item ${pathName === '' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className='nav__link'>
              <Link
                to='/add-post'
                className={`nav__link__item ${
                  pathName === 'add-post' ? 'active' : ''
                }`}
              >
                Add Post
              </Link>
            </li>
            <li className='nav__link'>
              <button
                className='nav__button nav__button--logout'
                onClick={removeAuth}
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
