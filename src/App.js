// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import Sales from './Components/Sales';
import Purchases from './Components/Purchases';
import Expenses from './Components/Expenses'; // Import Expenses component
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Settings from './Components/Settings';
import Profile from './Components/Profile';
import InvoiceGenerator from './Components/InvoiceGenerator';
import BillDetails from './Components/BillDetails';
import Invoice from './Components/Invoice';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin status
  const [username, setUsername] = useState('');

  const handleLogin = (status, user = '', admin = false) => {
    setIsLoggedIn(status);
    setUsername(user);
    setIsAdmin(admin); // Set admin status
  };

  const handleRegister = (user) => {
    setUsername(user);
    handleLogin(true, user);
  };

  return (
    <Router>
      <div className="App">
        <div className="overlay"></div>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Login and Register Pages */}
          <Route
            path="/login"
            element={<Login onLogin={(status, user) => handleLogin(status, user)} />}
          />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />

          
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard username={username} isAdmin={isAdmin} /> : <Navigate to="/login" />
            }
          />

          {/* Guest Dashboard */}
          <Route
            path="/guest-dashboard"
            element={<Dashboard username="Guest" />}
          />

          {/* Admin Dashboard Route */}
          <Route
            path="/guest-dashboard"
            element={
              isAdmin ? <Dashboard username={username} isAdmin={isAdmin} /> : <Navigate to="/Dashboard" />
            }
          />

          {/* Sales Page Route */}
          <Route path="/sales" element={<Sales />} />

          {/* Purchases Page Route */}
          <Route path="/purchases" element={<Purchases />} />

          {/* Expenses Page Route */}
          <Route path="/expenses" element={<Expenses />} /> {/* Added Expenses route */}

          {/* Settings Page Route */}
          <Route path="/settings" element={<Settings />} />

          {/* Profile Page Route */}
          <Route path="/profile" element={<Profile />} />

          <Route path='/InvoiceGenerator' element={<InvoiceGenerator />} />

          <Route path='/BillDetails' element={<BillDetails />} />

          <Route path="/invoice" element={<Invoice />} />

          <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/dashboardd" element={<Dashboard/>}/>
       
          
        </Routes>

      </div>
    </Router>
  );
};

export default App;