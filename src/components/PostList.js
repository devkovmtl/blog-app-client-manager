import { useEffect, useState } from 'react';

const PostList = () => {
  const [scroll, setScroll] = useState();

  const scrollHandler = () => {
    setScroll(window.scrollY);
  };

  const goBackUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className='posts'>
      <div className='post__list post__list--unpublished'>
        <h1 className='post__list__title'>Unpublished Post</h1>
        <div>
          <div className='post__card post__card--unpublished'>
            <h2 className='post__card__title'>Title 1</h2>
            <p className='post__card__body'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, at repudiandae quasi fuga necessitatibus laboriosam
              dolores velit repellat quo labore!
            </p>
            <div className='post__card__footer'>
              <button className='button button__status button__status--publish'>
                Publish
              </button>
              <button className='button button__details'>See Details</button>
            </div>
          </div>
          <div className='post__card post__card--unpublished'>
            <h2 className='post__card__title'>Title 2</h2>
            <p className='post__card__body'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, at repudiandae quasi fuga necessitatibus laboriosam
              dolores velit repellat quo labore!
            </p>
            <div className='post__card__footer'>
              <button className='button button__status button__status--publish'>
                Publish
              </button>
              <button className='button button__details'>See Details</button>
            </div>
          </div>
          <div className='post__card post__card--unpublished'>
            <h2 className='post__card__title'>Title 3</h2>
            <p className='post__card__body'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, at repudiandae quasi fuga necessitatibus laboriosam
              dolores velit repellat quo labore!
            </p>
            <div className='post__card__footer'>
              <button className='button button__status button__status--publish'>
                Publish
              </button>
              <button className='button button__details'>See Details</button>
            </div>
          </div>
        </div>
      </div>
      <div className='post__list post__list--published'>
        <h1 className='post__list__title'>Published Post</h1>
        <div>
          <div className='post__card post__card--published'>
            <h2 className='post__card__title'>Title 1</h2>
            <p className='post__card__body'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, at repudiandae quasi fuga necessitatibus laboriosam
              dolores velit repellat quo labore!
            </p>
            <div className='post__card__footer'>
              <button className='button button__status button__status--unpublish'>
                Unpublish
              </button>
              <button className='button button__details'>See Details</button>
            </div>
          </div>
          <div className='post__card post__card--published'>
            <h2 className='post__card__title'>Title 2</h2>
            <p className='post__card__body'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, at repudiandae quasi fuga necessitatibus laboriosam
              dolores velit repellat quo labore!
            </p>
            <div className='post__card__footer'>
              <button className='button button__status button__status--unpublish'>
                Unpublish
              </button>
              <button className='button button__details'>See Details</button>
            </div>
          </div>
        </div>
      </div>
      {scroll > 20 ? (
        <button className='button__scroll__top' onClick={goBackUp}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            fill='currentColor'
            className='bi bi-arrow-up-circle'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export default PostList;
