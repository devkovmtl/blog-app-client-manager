import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { SERVER_DEV_URL } from '../constant';
import UserContent from '../context/UserContext';
import Comment from './Comment';

const PostDetails = () => {
  const { auth } = useContext(UserContent);
  let { postId } = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publish, setPublish] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    submitErrors: '',
  });
  const [comments, setComments] = useState([]);

  const handleTitleChange = (e) => {
    let newErrors = {
      title: '',
      submitErrors: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    let newErrors = {
      content: '',
      submitErrors: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setContent(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let updatedErrors = {};
    if (!title.trim() && !content.trim()) {
      updatedErrors = {
        title: 'Title is required with at least 1 character',
        content: 'Content is required with at least 1 character',
      };
      setErrors((prevState) => ({ ...prevState, ...updatedErrors }));
      return;
    }

    if (!title.trim()) {
      updatedErrors = {
        title: 'Title is required with at least 1 character',
      };
      setErrors((prevState) => ({ ...prevState, ...updatedErrors }));
      return;
    }

    if (!content.trim()) {
      updatedErrors = {
        content: 'Content is required with at least 1 character',
      };
      setErrors((prevState) => ({ ...prevState, ...updatedErrors }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.put(
        SERVER_DEV_URL + postId,
        {
          title,
          content,
          isPublished: publish,
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
        navigate(`/`);
        toast.success('Post blog Updated', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        setIsLoading(false);
        updatedErrors = {
          submitErrors: 'Error. Try again',
        };
        setErrors((prevState) => ({
          ...prevState,
          ...updatedErrors,
        }));
      }
    } catch (error) {
      setIsLoading(false);
      updatedErrors = {
        submitErrors: 'Error. Try again',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
    }
  };

  const onDeletePost = async () => {
    let updatedErrors = {};
    try {
      const response = await axios.delete(SERVER_DEV_URL + postId, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (response.data.success) {
        navigate('/');
        toast.success('Post blog deleted', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        updatedErrors = {
          submitErrors: 'Could not delete the post. Try Again',
        };
        setErrors((prevState) => ({
          ...prevState,
          ...updatedErrors,
        }));
      }
    } catch (error) {
      updatedErrors = {
        submitErrors: 'Could not delete the post. Try Again',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
    }
  };

  const deleteComment = async (commentId) => {
    setIsLoading(true);
    let updatedErrors = {};
    try {
      const response = await axios.delete(
        SERVER_DEV_URL + 'comments/' + commentId,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setIsLoading(false);

      if (response.data.success) {
        toast.success('Comment deleted!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setComments([
          ...comments.filter((comment) => comment._id !== commentId),
        ]);
      }
      updatedErrors = {
        submitErrors: 'Error. Try again',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
    } catch (error) {
      updatedErrors = {
        submitErrors: 'Error. Try again',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
    }
  };

  useEffect(() => {
    setIsLoading(true);

    try {
      const fetchPost = async () => {
        const response = await axios.get(SERVER_DEV_URL + postId);
        setIsLoading(false);
        const data = response.data;
        if (data.success) {
          setPost((prevState) => ({
            ...prevState,
            post: {
              ...response.data.post,
            },
          }));
          setTitle(response.data.post.title);
          setContent(response.data.post.content);
          setPublish(response.data.post.isPublished);
          setComments([...response.data.post.comments]);
        } else {
          console.log(data.message);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : post ? (
        <div id={`${post.post._id}`}>
          <h3>Update post, delete post or delete comment</h3>
          <div>
            <button
              className='button button__delete button__delete__post'
              onClick={onDeletePost}
            >
              Delete Post
            </button>
          </div>
          <form
            className='form form__post form__post__update'
            onSubmit={submitForm}
            noValidate
          >
            <div className='form__group'>
              <label
                htmlFor='title'
                className={`input-group__label ${
                  errors.title ? 'input-group__label--invalid' : ''
                }`}
              >
                <span style={{ color: '#ff0000' }}>*</span>Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                placeholder='Title'
                className={`input-group__input ${
                  errors.title ? 'input-group__input--invalid' : ''
                }`}
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div className='form__group'>
              <label
                htmlFor='content'
                className={`input-group__label ${
                  errors.content ? 'input-group__label--invalid' : ''
                }`}
              >
                <span style={{ color: '#ff0000' }}>*</span> Content
              </label>
              <textarea
                name='content'
                id='content'
                cols='30'
                rows='10'
                className={`input-group__textarea ${
                  errors.content ? 'input-group__textarea--invalid' : ''
                }`}
                placeholder='Enter your comment'
                required
                value={content}
                onChange={handleContentChange}
              ></textarea>
              {errors.content && (
                <div className='input-group--invalid-feedback'>
                  <p>{errors.content}</p>
                </div>
              )}
            </div>

            <div className='form__group form__group__switch'>
              <label
                htmlFor='content'
                className='input-group__label input-group__label--switch'
              >
                Publish
              </label>
              <Switch
                checked={publish}
                onChange={setPublish}
                onColor='#20c997'
                onHandleColor='#3ce0af'
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                height={20}
                width={48}
              />
            </div>

            {errors.submitErrors ? (
              <p
                style={{ textAlign: 'center', fontSize: '14px', color: 'red' }}
              >
                {errors.submitErrors}
              </p>
            ) : null}
            <input
              type='submit'
              value='Update'
              className='button input__submit input__update'
            />
          </form>

          <div>
            {comments.length ? (
              <>
                <h1 style={{ margin: '24px 0' }}>Comments:</h1>
                <div className='comments__container'>
                  {comments.map((comment) => (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      onDeleteComment={deleteComment}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p>No Comments posted yet</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PostDetails;
