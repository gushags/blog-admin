// AuthLogin.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;

function AuthLogin() {
  const { login, saveUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    setError(null);

    try {
      const postData = { username, password };
      const response = await fetch(API_URL + `/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (!response.ok) {
        setUsername('');
        setPassword('');
        throw new Error(`${result.message}`);
      }

      login(result.token);
      saveUser(result.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>Please login</h3>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {loading && <p>Loading...</p>}

      <label htmlFor='username'>Username</label>
      <input
        type='text'
        name='username'
        autoComplete='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor='password'>Password</label>
      <input
        type='password'
        name='password'
        autoComplete='current-password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type='submit'>Login</button>
    </form>
  );
}

export default AuthLogin;
