// AppRouter.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import AdminRoute from '../components/AdminRoute';
import AuthLayout from '../pages/AuthPage/AuthLayout/AuthLayout';
import Users from '../pages/Users/Users';
import Posts from '../pages/Posts/Posts';
import UserProfile from '../pages/UserProfile/UserProfile';
import RootLayout from '../components/RootLayout';
import WritePost from '../pages/WritePost/WritePost';
import PostDetail from '../pages/PostDetail/PostDetail';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route
            path='dashboard'
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route path='login' element={<AuthLayout />} />
          <Route
            path='users'
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path='posts'
            element={
              <AdminRoute>
                <Posts />
              </AdminRoute>
            }
          />
          <Route
            path={'create'}
            element={
              <AdminRoute>
                <WritePost />
              </AdminRoute>
            }
          />
          <Route
            path='users/:id'
            element={
              <AdminRoute>
                <UserProfile />
              </AdminRoute>
            }
          />
          <Route
            path='posts/:id'
            element={
              <AdminRoute>
                <PostDetail />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
