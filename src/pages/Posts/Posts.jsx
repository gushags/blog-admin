// Posts.jsx

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import style from './Posts.module.css';

function Users() {
  const { authToken } = useContext(AuthContext);
  const [posts, setPosts] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL + `/posts`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setPosts(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [API_URL, authToken]);

  const handlePublish = async (post) => {
    setLoading(true);
    const updatePost = {
      published: !post.published,
    };
    try {
      const response = await fetch(API_URL + `/posts/${post.id}`, {
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
      const updatedPost = result.data;
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return; // stop the delete
    }
    setLoading(true);
    try {
      const response = await fetch(API_URL + `/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {posts && (
        <>
          <div>Posts Page</div>
          <ul>
            {posts.map((post) => (
              <div key={post.id}>
                <li>
                  <div className={style.postTitle}>
                    <Link to={`/posts/${post.id}`}>
                      <h4>
                        {post.title} -- {post.published ? 'Published' : 'Draft'}
                      </h4>
                    </Link>
                    <button onClick={() => handlePublish(post)}>
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      className={style.danger}
                    >
                      DELETE
                    </button>
                  </div>
                  {
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.slice(0, 100),
                      }}
                    />
                  }
                </li>
              </div>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Users;
