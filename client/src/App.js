import React, { useEffect } from 'react';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Register from './components/Register';
import UserHome from './components/UserHome';
import ManageUser from './components/ManageUser';
import Navbar from './components/Navbar';
import { useState } from 'react';
import ViewInventory from './components/ViewInventory';
import { authUsingToken } from './services/auth';
import NotFound from './components/NotFound';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkIsLogin();
  }, [isLogin]);

  const checkIsLogin = async () => {
    const response = await authUsingToken('');

    if (!response) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  return (
    <>
      {isLogin ? <Navbar /> : ''}

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home">
            <Route index={true} element={<UserHome />} />
            <Route path="manage" element={<ManageUser />} />
            <Route path="manage/inventory" element={<ViewInventory />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
