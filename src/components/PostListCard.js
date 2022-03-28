const PostListCard = ({ post }) => {
  return (
    <div
      className={`post__list__card post__list__card--${
        post.isPublished ? 'unpublished' : 'publish'
      }`}
    >
      <h2 className='post__list__card__title'>{post.title}</h2>
      <p className='post__list__card__body'>{post.content}</p>
      <div className='post__list__card__footer'>
        <button
          className={`button button__status button__status--${
            !post.isPublished ? 'publish' : 'unpublished'
          }`}
        >
          {!post.isPublished ? 'Publish' : 'Unpublish'}
        </button>
        <button className='button button__details'>See Details</button>
      </div>
    </div>
  );
};

export default PostListCard;
