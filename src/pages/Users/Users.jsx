// Users.jsx
import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import style from './Users.module.css';

function Users() {
  const { authToken } = useContext(AuthContext);
  const [users, setUsers] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = useCallback(async () => {
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
  }, [API_URL, authToken]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleMakeAdmin = async (id, admin) => {
    const updateUser = {
      isAdmin: !admin,
    };

    try {
      const response = await fetch(API_URL + `/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updateUser),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchUsers();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return; // stop the delete
    }
    try {
      const response = await fetch(API_URL + `/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchUsers();
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
      {users && (
        <>
          <div>Users Page</div>
          <ul>
            {users.map((user) => (
              <div key={user.id}>
                <li className={user.isAdmin ? style.admin : ''}>
                  {user.firstname} {user.lastname} -- ({user.username})
                </li>
                <button onClick={() => handleMakeAdmin(user.id, user.isAdmin)}>
                  {user.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                </button>
                <button onClick={() => navigate(`/users/${user.id}`)}>
                  Edit User
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className={style.danger}
                >
                  DELETE
                </button>
              </div>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Users;
