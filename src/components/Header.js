import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContent from '../context/UserContext';

const Header = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const pathName = location.pathname.split('/')[1];

  const { auth, removeAuth } = useContext(UserContent);

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
