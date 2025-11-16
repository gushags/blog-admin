// HomePage.jsx

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Dashboard() {
  const { logout, authToken } = useContext(AuthContext);
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch(API_URL + `/posts/`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setPosts(result.data);
        setComments(countComments(result.data));

        const userRes = await fetch(API_URL + `/users`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!userRes.ok) {
          throw new Error(`HTTP error! status: ${userRes.status}`);
        }
        const userResult = await userRes.json();
        setUsers(userResult.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [API_URL, authToken]);

  const countComments = (posts) => {
    let count = 0;
    posts.map((post) => (count += post.comments.length));
    return count;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {users && posts && (
        <>
          <div>The Big Blog Dashboard</div>
          <div>
            <section>Users</section>
            <Link to={'/users'}>
              <p>Total users: {users.length}</p>
            </Link>
            <Link to={'/posts'}>
              <section>Posts and Comments</section>
              <div>Total posts: {posts.length}</div>
              <div>Total Comments: {comments}</div>
            </Link>
          </div>
          <div onClick={logout}>Logout</div>
        </>
      )}
    </>
  );
}

export default Dashboard;
