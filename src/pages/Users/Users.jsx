// Users.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Users() {
  const { authToken } = useContext(AuthContext);
  const [users, setUsers] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL + `/users/`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setUsers(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [API_URL, authToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {users && (
        <>
          <div>Users Page</div>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Users;
