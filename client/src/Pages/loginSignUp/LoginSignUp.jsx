import { useState } from 'react';
import LoginForm from './loginSignUp/Login/Login.jsx'; // Adjust the import path as necessary
import SignUpForm from './loginSignUp/SignUp/Register.jsx'; // Assuming you have a SignUpForm component
import Signature from '../../components/Signature/Signature.jsx';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css'

const LoginSignUp = ({ handleDashBoard }) => {
  const [toggleSelector, setToggleSelector] = useState(true);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (username) => {
    setLoggedInUsername(username);
  };

  const handleLoginSuccess = async (data) => {
    sessionStorage.setItem('authToken', data.token);
    console.log('Login successful. Token set in session storage.');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/role?username=${loggedInUsername}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user role');
      }
      const roleData = await response.json();
      console.log('User role:', roleData.role);

      handleDashBoard(roleData.role);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error fetching user role:', error);
      // Handle error
    }
  };

  return (
    <div className='loginSignUp-container'>
      <h1>Clothing Brand - {toggleSelector ? 'Sign In' : 'Sign Up'}</h1>
      <fieldset>
        <legend className='loginSignUp-selector'>
          <button
            type='button'
            onClick={() => setToggleSelector(true)}
          >
            Sign In
          </button>
          <button
            type='button'
            onClick={() => setToggleSelector(false)}
          >
            Sign Up
          </button>
        </legend>
        {toggleSelector ? (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onUsernameChange={handleUsernameChange}
          />
        ) : (
          <SignUpForm /> // Use SignUpForm here, assuming it's implemented similarly
        )}
      </fieldset>
      <Signature />
    </div>
  );
};

export default LoginSignUp;
