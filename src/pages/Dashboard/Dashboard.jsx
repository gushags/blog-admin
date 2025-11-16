// HomePage.jsx

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import style from './Dashboard.module.css';

function Dashboard() {
  const { authToken, user } = useContext(AuthContext);
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
          <div className={style.cards}>
            <Link to={`/users/${user.id}`}>
              <div className={style.card}>
                <div>{user.username}</div>
                <p>
                  {user.firstname} {user.lastname}
                </p>
                <p>Edit</p>
              </div>
            </Link>
            <Link to={'/users'}>
              <div className={style.card}>
                <div>Manage Users</div>
                <p>Total users: {users.length}</p>
              </div>
            </Link>
            <Link to={'/posts'}>
              <div className={style.card}>
                <div>Manage Posts and Comments</div>
                <p>Total posts: {posts.length}</p>
                <p>Total Comments: {comments}</p>
              </div>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
