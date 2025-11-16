// Posts.jsx

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {posts && (
        <>
          <div>Posts Page</div>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Users;
