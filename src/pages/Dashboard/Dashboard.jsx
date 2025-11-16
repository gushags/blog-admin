// HomePage.jsx

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Dashboard() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <div>This is the Dashboard</div>
      <div>
        <section>Users</section>
        <section>Posts</section>
        <section>Comments</section>
      </div>
      <div onClick={logout}>Logout</div>
    </>
  );
}

export default Dashboard;
