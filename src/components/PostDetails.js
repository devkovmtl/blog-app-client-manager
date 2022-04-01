import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

const PostDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState();
  let { postId } = useParams();

  useEffect(() => {}, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>Post Details {postId}</h1>
        </div>
      )}
    </>
  );
};

export default PostDetails;
