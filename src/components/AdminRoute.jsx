// AdminRoute

import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function AdminRoute({ children }) {
  const { authToken } = useContext(AuthContext);

  if (!authToken) return <Navigate to='/login' replace />;

  return children;
}

export default AdminRoute;
