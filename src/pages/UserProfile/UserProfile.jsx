// UserProfile.jsx

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UserEdit from '../UserEdit/UserEdit';
const API_URL = import.meta.env.VITE_API_URL;

function UserProfile() {
  const [fetchUser, setFetchUser] = useState(null);
  const { id } = useParams();
  const { authToken, user, saveUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOneUser = async () => {
      try {
        const response = await fetch(API_URL + `/users/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setFetchUser(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOneUser();
  }, [id, authToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {fetchUser && (
        <UserEdit
          id={id}
          fetchUser={fetchUser}
          authToken={authToken}
          user={user}
          onSuccess={(updatedUser) => {
            setFetchUser(updatedUser);
            saveUser(updatedUser);
          }}
        />
      )}
    </>
  );
}

export default UserProfile;
