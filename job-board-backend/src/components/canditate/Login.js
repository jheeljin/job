import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/candidate/login', { email, password });
      setMessage('Login successful!');
      console.log('Login Data:', response.data);

      // Store the token if needed (e.g., localStorage or state)
      const token = response.data.token;

      // Navigate to the job apply page after successful login
      navigate(`/jobs/apply/${response.data.jobId}`); // Use navigate to redirect
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.response?.data?.message || 'Error logging in.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
