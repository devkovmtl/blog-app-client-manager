const Comment = ({
  comment: { _id, content, username, createdAtFormatted },
  onDeleteComment,
}) => (
  <div className='comment'>
    <div className='comment__body'>
      <p>{content}</p>
    </div>
    <div className='comment__footer'>
      <p>
        Posted by <strong>{username}</strong>
      </p>
      <p
        style={{
          fontSize: '14px',
          fontStyle: 'italic',
          fontWeight: 300,
        }}
      >
        {createdAtFormatted}
      </p>
    </div>
    <button
      className='button button__delete button__delete__comment'
      onClick={() => onDeleteComment(_id)}
    >
      Delete
    </button>
  </div>
);

export default Comment;
