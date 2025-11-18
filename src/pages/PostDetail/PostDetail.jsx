// PostDetail.jsx
import { useEffect, useState, useCallback, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentList from '../../components/commentList/CommentList';
import { AuthContext } from '../../context/AuthContext';
import style from './PostDetail.module.css';
const API_URL = import.meta.env.VITE_API_URL;

function PostDetail() {
  const [displayPost, setDisplayPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);

  const fetchOnePost = useCallback(async () => {
    try {
      const response = await fetch(API_URL + `/posts/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setDisplayPost(result.data);
      setComments(result.data.comments);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOnePost();
  }, [id, fetchOnePost]);

  const handlePublish = async () => {
    setLoading(true);
    const updatePost = {
      published: !displayPost.published,
    };
    try {
      const response = await fetch(API_URL + `/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatePost),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setDisplayPost(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return; // stop the delete
    }
    setLoading(true);
    try {
      const response = await fetch(API_URL + `/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //   const result = await response.json();
      setDeleted(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (deleted)
    return (
      <>
        <div>Your post has been deleted</div>
        <button onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </button>
      </>
    );

  return (
    <div>
      <section className='posts'>
        <div key={displayPost.id}>
          <div className={style.postTitle}>
            <h1>{displayPost.title}</h1>
            <h4>{displayPost.published ? 'Published' : 'Draft'}</h4>
            <button onClick={handlePublish}>
              {displayPost.published ? 'Unpublish' : 'Publish'}
            </button>
            <button onClick={handleDelete} className={style.danger}>
              DELETE
            </button>
          </div>
          <h3>
            Author:{' '}
            <Link to={`/users/${displayPost.authorId}`}>
              {displayPost.author.firstname} {displayPost.author.lastname}
            </Link>
          </h3>
          {<div dangerouslySetInnerHTML={{ __html: displayPost.content }} />}
          <div>
            <h3>Comments</h3>
            <CommentList
              comments={comments}
              level={0}
              postId={displayPost.id}
              fetchOnePost={fetchOnePost}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostDetail;
