// RootLayout.jsx

import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default RootLayout;
