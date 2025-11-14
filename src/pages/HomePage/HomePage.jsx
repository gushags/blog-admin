// HomePage.jsx

import { useContext } from 'react';
import AuthLayout from '../AuthPage/AuthLayout/AuthLayout';
import { AuthContext } from '../../context/AuthContext';

function HomePage() {
  const { isLogin, setIsLogin, logout, authToken } = useContext(AuthContext);
  return (
    <>
      {authToken ? (
        <>
          <div>This is the homepage</div>
          <div>
            <section>Users</section>
            <section>Posts</section>
            <section>Comments</section>
          </div>
          <div onClick={logout}>Logout</div>
        </>
      ) : (
        <>
          <AuthLayout isLogin={isLogin} setIsLogin={setIsLogin} />
        </>
      )}
    </>
  );
}

export default HomePage;
