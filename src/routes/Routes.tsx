// routes.tsx

import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

// Import your components
import Orders from '../components/orders';
import Positions from '../components/positions';
import Login from '../components/login';
import ProtectedRoutesLayout from './ProtectedRoutes';

const AllRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoutesLayout/>}>
            <Route index element={<Orders/>} ></Route>
            <Route path="/orders" element={<Orders/>}></Route>
            <Route path="/positions" element={<Positions/>}></Route>
        </Route>

        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
