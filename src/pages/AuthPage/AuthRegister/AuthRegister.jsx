// AuthRegister.jsx

import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

function AuthRegister({ setIsLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!username || !email || !firstname || !pwd || !confirmPwd) return;
    if (pwd !== confirmPwd) {
      setError({ message: 'Passwords must match.' });
      setConfirmPwd('');
      return;
    }
    try {
      const userData = {
        username,
        email,
        firstname,
        lastname,
        bio,
        avatarUrl,
        websiteUrl,
        pwd,
      };

      console.log('Try to register');
      const response = await fetch(API_URL + `/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

      setUsername('');
      setEmail('');
      setFirstname('');
      setLastname('');
      setBio('');
      setAvatarUrl('');
      setWebsiteUrl('');
      setPwd('');
      setError(null);

      setIsLogin(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Register</h3>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {loading && <p>Loading...</p>}
      <form onSubmit={handleRegister}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          value={username}
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          placeholder='username@example.com'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor='firstname'>First name</label>
        <input
          type='text'
          name='firstname'
          value={firstname}
          placeholder='First name'
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <label htmlFor='lastname'>Last name</label>
        <input
          type='text'
          name='lastname'
          value={lastname}
          placeholder='Last name'
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <label htmlFor='bio'>Bio</label>
        <textarea
          name='bio'
          cols='40'
          rows='3'
          placeholder='Enter a short description of yourself.'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <label htmlFor='avatarUrl'>Avatar</label>
        <input
          type='url'
          name='avatarUrl'
          value={avatarUrl}
          placeholder='Avatar url'
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <label htmlFor='websiteUrl'>Website</label>
        <input
          type='url'
          name='websiteUrl'
          value={websiteUrl}
          placeholder='Website url'
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
        <label htmlFor='pwd'>Password</label>
        <input
          type='password'
          name='pwd'
          autoComplete='current-password'
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <label htmlFor='confirmPwd'>Confirm Password</label>
        <input
          type='password'
          name='confirmPwd'
          value={confirmPwd}
          autoComplete='none'
          onChange={(e) => setConfirmPwd(e.target.value)}
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default AuthRegister;
