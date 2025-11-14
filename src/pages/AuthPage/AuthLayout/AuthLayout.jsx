// AuthLayout.jsx

import AuthLogin from '../AuthLogin/AuthLogin';
import AuthRegister from '../AuthRegister/AuthRegister';
import styles from './AuthLayout.module.css';

function AuthLayout({ isLogin, setIsLogin }) {
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
