import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h2>Welcome to the Job Board</h2>
      
      {/* Candidate Section */}
      <div>
        <h3>Candidate</h3>
        <Link to="/candidate/login">
          <button>Candidate Login</button>
        </Link>
        <Link to="/candidate/register">
          <button>Candidate Register</button>
        </Link>
      </div>

      {/* Employee Section */}
      <div>
        <h3>Employee</h3>
        <Link to="/employee/login">
          <button>Employee Login</button>
        </Link>
        <Link to="/employee/register">
          <button>Employee Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
