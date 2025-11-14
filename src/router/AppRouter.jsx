// AppRouter.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLogin from '../pages/AuthPages/AuthLogin';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthLogin />} />
      </Routes>
    </Router>
  );
}
