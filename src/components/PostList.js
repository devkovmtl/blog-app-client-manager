import { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
import PostListCard from './PostListCard';
import Loader from './Loader';
import { SERVER_DEV_URL } from '../constant';

const PostList = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [scroll, setScroll] = useState();
  const [isPublished, setIsPublished] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(SERVER_DEV_URL);
        setIsLoading(false);
        if (response.data.success) {
          setPosts([...response.data.posts]);
        } else {
          setIsLoading(false);
          console.log(response.data.message || 'Error fetching the post');
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error || 'Error fetching the post');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='posts'>
          <div className='switch__published__status'>
            <label htmlFor='switch__status'>
              <span>{isPublished ? 'Published Post' : 'Unpublished Post'}</span>
            </label>
            <Switch
              checked={isPublished}
              onChange={setIsPublished}
              onColor='#0bb5d8'
              onHandleColor='#0dcaf0'
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
              activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
              height={20}
              width={48}
            />
          </div>

          {isPublished ? (
            <div className='post__container post__container--published'>
              <h1 className='post__container__title'>Published Post</h1>
              <div className='post__list'>
                {posts && posts.filter((post) => post.isPublished).length ? (
                  posts
                    .filter((post) => post.isPublished)
                    .map((post) => <PostListCard key={post._id} post={post} />)
                ) : (
                  <div>
                    <p>No published post yet.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='post__container post__container--unpublished'>
              <h1 className='post__container__title'>Unpublished Post</h1>
              <div className='post__list'>
                {posts && posts.filter((post) => !post.isPublished).length ? (
                  posts
                    .filter((post) => !post.isPublished)
                    .map((post) => <PostListCard key={post._id} post={post} />)
                ) : (
                  <div>
                    <p>No Unpublished post yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
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
      )}
    </>
  );
};

export default PostList;
