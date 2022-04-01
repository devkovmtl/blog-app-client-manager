import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_DEV_URL } from '../constant';
import UserContent from '../context/UserContext';

const PostListCard = ({ post, setIsLoading }) => {
  const navigate = useNavigate();
  const { auth } = useContext(UserContent);
  const navigateToDetails = (postId) => navigate(`/${postId}`);

  const updatePublishStatus = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        SERVER_DEV_URL + post._id,
        {
          title: post.title,
          content: post.content,
          isPublished: !post.isPublished,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setIsLoading(false);

      if (response.data.success) {
        navigate('/');
      }
    } catch (error) {}
  };

  return (
    <>
      <div
        className={`post__list__card post__list__card--${
          post.isPublished ? 'published' : 'unpublished'
        }`}
      >
        <h2
          className='post__list__card__title'
          onClick={() => navigateToDetails(post._id)}
        >
          {post.title}
        </h2>
        <p className='post__list__card__body'>{post.content}</p>
        <div className='post__list__card__footer'>
          <button
            className={`button button__status button__status--${
              !post.isPublished ? 'publish' : 'unpublish'
            }`}
            onClick={updatePublishStatus}
          >
            {!post.isPublished ? 'Publish' : 'Unpublish'}
          </button>
          <button
            className='button button__details'
            onClick={() => navigateToDetails(post._id)}
          >
            See Details
          </button>
        </div>
      </div>
    </>
  );
};

export default PostListCard;
