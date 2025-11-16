// AppRouter.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import AdminRoute from '../components/AdminRoute';
import AuthLayout from '../pages/AuthPage/AuthLayout/AuthLayout';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' replace />} />
        <Route
          path='/dashboard'
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path='/login' element={<AuthLayout />} />
      </Routes>
    </Router>
  );
}
