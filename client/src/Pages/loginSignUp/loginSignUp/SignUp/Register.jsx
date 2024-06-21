// LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess, onUsernameChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const API = process.env.REACT_APP_API_URL + '/login';
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful', data);
        onUsernameChange(username); // Pass username to parent
        onLoginSuccess(data);
        navigate('/dashboard'); // Navigate to the dashboard route
      } else {
        throw new Error(data.message || 'Failed to login');
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className='error'>{errorMessage}</p>}
      <div>
        <label htmlFor='login-username'>
          Username:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor='login-password'>
          Password:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
