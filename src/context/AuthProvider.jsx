// AuthProvider.jsx

import { useState, useCallback } from 'react';

import { AuthContext } from './AuthContext';

function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(() => {
    // Initialize from localStorage if it exists
    return localStorage.getItem('token') || null;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = useCallback((token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
  }, []);

  const saveUser = useCallback((u) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  }, []);

  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthContext.Provider
      value={{ authToken, user, saveUser, login, logout, isLogin, setIsLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
