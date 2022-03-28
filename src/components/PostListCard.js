const PostListCard = ({ post }) => {
  return (
    <div
      className={`post__list__card post__list__card--${
        post.isPublished ? 'published' : 'unpublished'
      }`}
    >
      <h2 className='post__list__card__title'>{post.title}</h2>
      <p className='post__list__card__body'>{post.content}</p>
      <div className='post__list__card__footer'>
        <button
          className={`button button__status button__status--${
            !post.isPublished ? 'publish' : 'unpublish'
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
