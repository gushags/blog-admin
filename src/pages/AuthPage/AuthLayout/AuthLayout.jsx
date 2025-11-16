// AuthLayout.jsx

import AuthLogin from '../AuthLogin/AuthLogin';
import AuthRegister from '../AuthRegister/AuthRegister';
import styles from './AuthLayout.module.css';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

function AuthLayout() {
  const { isLogin, setIsLogin } = useContext(AuthContext);
  return (
    <>
      {isLogin ? (
        <>
          <AuthLogin />
          <p className={styles.authLink} onClick={() => setIsLogin(!isLogin)}>
            Register
          </p>
        </>
      ) : (
        <>
          <AuthRegister setIsLogin={setIsLogin} />
          <p className={styles.authLink} onClick={() => setIsLogin(!isLogin)}>
            Login
          </p>
        </>
      )}
    </>
  );
}

export default AuthLayout;
