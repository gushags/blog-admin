// UserEdit.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

function UserEdit({ id, authToken, fetchUser, onSuccess }) {
  const [firstname, setFirstname] = useState(fetchUser.firstname);
  const [lastname, setLastname] = useState(fetchUser.lastname);
  const [email, setEmail] = useState(fetchUser.email);
  const [bio, setBio] = useState(fetchUser.bio);
  const [websiteUrl, setWebsiteUrl] = useState(fetchUser.websiteUrl);
  const [avatarUrl, setAvatarUrl] = useState(fetchUser.avatarUrl);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (newPassword !== confirmPassword) {
      console.log('Passwords do not match.');
      throw new Error({ message: 'Passwords do not match.' });
    }

    try {
      const updatedUser = {
        ...(fetchUser.firstname !== firstname && { firstname }),
        ...(fetchUser.lastname !== lastname && { lastname }),
        ...(fetchUser.email !== email && { email }),
        ...(fetchUser.bio !== bio && { bio }),
        ...(fetchUser.websiteUrl !== websiteUrl && { websiteUrl }),
        ...(fetchUser.avatarUrl !== avatarUrl && { avatarUrl }),
        ...(currPassword && { pwd: currPassword }),
        ...(newPassword && { newPwd: newPassword }),
      };
      const response = await fetch(API_URL + `/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const result = await response.json();

      if (!response.ok) {
        console.error('API error:', result);
        console.error('Validation errors:', result.errors);
        throw new Error(
          result.errors?.map((e) => e.msg).join(', ') || 'Unknown error'
        );
      }
      console.log(result);
      onSuccess(result.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={updateUser}>
      <h2>{fetchUser.username}</h2>
      {error ? <div>Error: {error.message}</div> : ''}
      <label htmlFor='firstname'>First Name</label>
      <input
        id='firstname'
        name='firstname'
        type='text'
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <label htmlFor='lastname'>Last Name</label>
      <input
        id='lastname'
        name='lastname'
        type='text'
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        name='email'
        type='email'
        value={email}
        autoComplete='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor='bio'>Bio</label>
      <textarea
        id='bio'
        name='bio'
        cols='60'
        rows='3'
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
      <label htmlFor='websiteUrl'>Website (url)</label>
      <input
        id='websiteUrl'
        name='websiteUrl'
        type='text'
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
      />
      <label htmlFor='avatarUrl'>Avatar (url)</label>
      <input
        id='avatarUrl'
        name='avatarUrl'
        type='text'
        autoComplete='none'
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <label htmlFor='currPassword'>Current Password</label>
      <input
        id='currPassword'
        name='currPassword'
        type='password'
        value={currPassword}
        autoComplete='current-password'
        onChange={(e) => setCurrPassword(e.target.value)}
      />
      <label htmlFor='newPassword'>New Password</label>
      <input
        id='newPassword'
        name='newPassword'
        type='password'
        autoComplete='new-password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input
        id='confirmPassword'
        name='confirmPassword'
        type='password'
        autoComplete='new-password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type='submit' disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Cancel
      </button>
    </form>
  );
}

export default UserEdit;
