// HomePage.jsx

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import style from './Dashboard.module.css';

function countComments(comments) {
  if (!comments || comments.length === 0) return 0;

  let total = 0;

  for (const comment of comments) {
    total += 1;
    total += countComments(comment.replies);
  }

  return total;
}

function countCommentsForPosts(posts) {
  let total = 0;
  for (const post of posts) {
    if (post.comments) {
      total += countComments(post.comments);
    }
  }
  return total;
}

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
        setPosts(result.data);
        setComments(countCommentsForPosts(result.data));

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
            <Link to={'/create'}>
              <div className={style.card}>
                <div>Write a Blog Post</div>
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
