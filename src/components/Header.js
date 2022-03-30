import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContent from '../context/UserContext';

const Header = () => {
  let navigate = useNavigate();
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
              <Link to='/' className='nav__link__item active'>
                Home
              </Link>
            </li>
            <li className='nav__link'>
              <Link to='/' className='nav__link__item'>
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
