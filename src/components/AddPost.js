import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import { SERVER_DEV_URL } from '../constant';
import UserContent from '../context/UserContext';
import Loader from './Loader';

const AddPost = () => {
  const { auth } = useContext(UserContent);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publish, setPublish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    submitErrors: '',
  });

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
      const response = await axios.post(
        SERVER_DEV_URL,
        { title, content, isPublished: publish },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.data.success) {
        setIsLoading(false);
        setContent('');
        setTitle('');
        toast.success('Post blog created!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        navigate('/');
      } else {
        setIsLoading(false);
        updatedErrors = {
          submitErrors: 'Error. Try again.',
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

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <form className='form form__post' onSubmit={submitForm} noValidate>
          <h1 style={{ textAlign: 'center' }}>Add New Post</h1>
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
            <p style={{ textAlign: 'center', fontSize: '14px', color: 'red' }}>
              {errors.submitErrors}
            </p>
          ) : null}
          <input
            type='submit'
            value='Submit'
            className='button input__submit'
          />
        </form>
      )}
    </div>
  );
};

export default AddPost;
