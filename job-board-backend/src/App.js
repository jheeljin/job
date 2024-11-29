import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  // Remove BrowserRouter import
import HomePage from './components/Homepage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import FeaturedJobs from './components/FeaturedJobs';
import Register from './components/canditate/Register';
import Login from './components/canditate/Login';
import ApplyJob from './components/canditate/ApplyJob';
import EmployeeRegister from './components/employee/EmployeeRegister';
import EmployeeLogin from './components/employee/EmployeeLogin';
import PostJob from './components/employee/PostJob';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Retrieve token from localStorage on page load

  const handleLoginSuccess = (token) => {
    setToken(token);
    localStorage.setItem('token', token); // Store token for persistence
  };

  // Protected Route component to handle route access based on token
  const ProtectedRoute = ({ element }) => {
    if (!token) {
      return <Navigate to="/employee/login" replace />; // Redirect to login if no token
    }
    return element;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/login" element={<EmployeeLogin handleLoginSuccess={handleLoginSuccess} />} />

        {/* Protected route for posting job */}
        <Route path="/employee/post-job" element={<PostJob token={token} />} />


        
        <Route path="/featured-jobs" element={<FeaturedJobs />} />
        
        {/* Candidate routes */}
        <Route path="/candidate/register" element={<Register />} />
        <Route path="/candidate/login" element={<Login />} />
        <Route path="/jobs/apply/:jobId" element={<ApplyJob />} />
      </Routes>
    </div>
  );
};

export default App;
