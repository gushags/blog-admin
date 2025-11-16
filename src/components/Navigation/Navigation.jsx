// Navigation.jsx

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  const { authToken, user, logout, setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogin(true);
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      <Link to='/dashboard'>
        <div>Logo</div>
      </Link>
      {authToken && user ? (
        <div>
          <p>Welcome, {user.firstname}</p>
          <Link to={`/users/${user.id}`}>
            <img
              src={user.avatarUrl || 'src/assets/react.svg'}
              alt='user avatar'
            />
          </Link>
          <p onClick={handleLogout}>Logout</p>
        </div>
      ) : (
        ''
      )}
    </nav>
  );
}

export default Navigation;
