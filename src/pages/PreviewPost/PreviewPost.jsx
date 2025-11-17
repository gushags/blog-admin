// PreviewPost.jsx
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';

function PreviewPost({
  setContent,
  setTitle,
  title,
  content,
  setIsEdit,
  isEdit,
}) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, authToken } = useContext(AuthContext);

  const handlePublish = async () => {
    console.log('Trying to publish now.');
    setLoading(true);

    try {
      const createPost = {
        title: title,
        content: content,
        published: true,
        authorId: user.id,
      };
      const response = await fetch(API_URL + `/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(createPost),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! ${response.status} error`);
      }
      //   setIsEdit(!isEdit);
      setContent('');
      setTitle('');
      localStorage.removeItem('draftPost');
      setIsPublished(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <>
      {!isPublished ? (
        <>
          <h1>{title}</h1>
          {<div dangerouslySetInnerHTML={{ __html: content }} />}
          <button onClick={() => setIsEdit(!isEdit)}>Continue Editing</button>
          <button onClick={handlePublish}>Publish</button>
        </>
      ) : (
        <>
          <h2>Your post has been published</h2>
          <button
            onClick={() => {
              navigate('/dashboard');
            }}
          >
            OK
          </button>
        </>
      )}
    </>
  );
}

export default PreviewPost;
