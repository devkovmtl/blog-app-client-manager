import { useNavigate } from 'react-router-dom';

const PostListCard = ({ post }) => {
  const navigate = useNavigate();

  const navigateToDetails = (postId) => navigate(`/${postId}`);

  return (
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
  );
};

export default PostListCard;
