// ProtectedRoutesLayout.tsx

import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores';
import ProfileMenu from '../components/helpers/Menu';

interface ProtectedRoutesLayoutProps {
//   children: React.ReactNode;
}

const ProtectedRoutesLayout: React.FC<ProtectedRoutesLayoutProps> = () => {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {/* Your layout components can be added here */}
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl">Orders & Positions</h1>
          <nav>
            <ul className="flex space-x-4">
              <ProfileMenu/>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet/>
      </main>
      {/* <footer>
        <p>Protected Routes Footer</p>
      </footer> */}
    </div>
  );
};

export default ProtectedRoutesLayout;
