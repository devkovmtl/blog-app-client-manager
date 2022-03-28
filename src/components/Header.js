const Header = () => {
  return (
    <header>
      <h1 className='title'>Blog - Manager</h1>
      <span className='flex'></span>
      <nav>
        <ul className='nav'>
          <li className='nav__link'>
            <a href='/' className='nav__link__item active'>
              Home
            </a>
          </li>
          <li className='nav__link'>
            <a href='/' className='nav__link__item'>
              Add Post
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
