// SignUp.jsx
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [state, setState] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  }, [email]);

  const handlePhoneInput = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const match = input.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    const formatted = `${match[1]}${match[2] ? '-' : ''}${match[2]}${
      match[3] ? '-' : ''
    }${match[3]}`;
    setPhoneNumber(formatted);
  };

  useEffect(() => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/;
    if (password && !passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 12 characters long and include 1 uppercase letter, 1 number, and 1 special character.'
      );
    } else {
      setPasswordError('');
    }
  }, [password]);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  }, [password, confirmPassword]);

  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = {
      firstName: event.target['first-name'].value,
      lastName: event.target['last-name'].value,
      username: event.target.username.value,
      email: event.target.email.value,
      phoneNumber: event.target['phone-number'].value,
      streetAddress: event.target['street-address'].value,
      streetAddress2: event.target['street-address2'].value,
      city: event.target.city.value,
      state: event.target.state.value,
      zip: event.target.zip.value,
      password: event.target.password.value,
    };
    // Assuming re-confirm password validation is done client-side
    // API call to sign up the user
    const API = process.env.REACT_APP_API_URL;
    // Make the POST request to the backend
    try {
      const response = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful', data);
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }

        // Example: Redirect to the dashboard or home page
        navigate('/dashboard');
        // Call the onSignUp callback, passing the user data
        onSignUp(data);
        // Handle unsuccessful signup, such as showing an error message
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      // Handle signup error
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label htmlFor='first-name'>
          First Name:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          type='text'
          id='first-name'
          name='first-name'
          placeholder=''
          required
        />
      </div>

      <div>
        <label htmlFor='last-name'>
          Last Name:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          type='text'
          id='last-name'
          name='last-name'
          placeholder=''
          required
        />
      </div>

      <div>
        <label htmlFor='username'>
          Username:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          type='text'
          id='username'
          name='username'
          placeholder=''
          required
        />
      </div>

      <div>
        <label htmlFor='email'>
          Email:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=''
          required
        />
        {emailError && <div>{emailError}</div>}
      </div>

      <div>
        <label htmlFor='phone-number'>
          Phone #:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          id='phone-number'
          type='tel'
          value={phoneNumber}
          onChange={handlePhoneInput}
          placeholder=''
          required
        />
      </div>

      <div>
        <label htmlFor='street-address'>Street Address:</label>
        <input
          type='text'
          id='street-address'
          name='street-address'
        />
      </div>

      <div>
        <label htmlFor='street-address2'>Street Address 2:</label>
        <input
          type='text'
          id='street-address2'
          name='street-address2'
          placeholder='Apt, Suite, etc. (optional)'
        />
      </div>

      <div>
        <label htmlFor='city'>
          City:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          type='text'
          id='city'
          name='city'
          placeholder=''
          required
        />
      </div>

      <div>
        <label htmlFor='state'>
          State:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <select
          id='state'
          name='state'
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option
            value=''
            disabled
          >
            Select a state
          </option>
          <option value='AL'>Alabama</option>
          <option value='AK'>Alaska</option>
          <option value='AZ'>Arizona</option>
          <option value='AR'>Arkansas</option>
          <option value='CA'>California</option>
          <option value='CO'>Colorado</option>
          <option value='CT'>Connecticut</option>
          <option value='DE'>Delaware</option>
          <option value='FL'>Florida</option>
          <option value='GA'>Georgia</option>
          <option value='HI'>Hawaii</option>
          <option value='ID'>Idaho</option>
          <option value='IL'>Illinois</option>
          <option value='IN'>Indiana</option>
          <option value='IA'>Iowa</option>
          <option value='KS'>Kansas</option>
          <option value='KY'>Kentucky</option>
          <option value='LA'>Louisiana</option>
          <option value='ME'>Maine</option>
          <option value='MD'>Maryland</option>
          <option value='MA'>Massachusetts</option>
          <option value='MI'>Michigan</option>
          <option value='MN'>Minnesota</option>
          <option value='MS'>Mississippi</option>
          <option value='MO'>Missouri</option>
          <option value='MT'>Montana</option>
          <option value='NE'>Nebraska</option>
          <option value='NV'>Nevada</option>
          <option value='NH'>New Hampshire</option>
          <option value='NJ'>New Jersey</option>
          <option value='NM'>New Mexico</option>
          <option value='NY'>New York</option>
          <option value='NC'>North Carolina</option>
          <option value='ND'>North Dakota</option>
          <option value='OH'>Ohio</option>
          <option value='OK'>Oklahoma</option>
          <option value='OR'>Oregon</option>
          <option value='PA'>Pennsylvania</option>
          <option value='RI'>Rhode Island</option>
          <option value='SC'>South Carolina</option>
          <option value='SD'>South Dakota</option>
          <option value='TN'>Tennessee</option>
          <option value='TX'>Texas</option>
          <option value='UT'>Utah</option>
          <option value='VT'>Vermont</option>
          <option value='VA'>Virginia</option>
          <option value='WA'>Washington</option>
          <option value='WV'>West Virginia</option>
          <option value='WI'>Wisconsin</option>
          <option value='WY'>Wyoming</option>
        </select>
      </div>

      <div>
        <label htmlFor='zip'>
          ZIP Code:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          type='text'
          id='zip'
          name='zip'
          pattern='\d{5}'
          title='Five digit zip code'
          required
          placeholder='Five digit zip code: 12345'
        />
      </div>

      <div>
        <label htmlFor='password'>
          Password:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <div>{passwordError}</div>}
      </div>

      <div>
        <label htmlFor='re-password'>
          Re-Password:{' '}
          <span>
            <strong>*</strong>
          </span>{' '}
        </label>
        <input
          id='re-password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {confirmPasswordError && <div>{confirmPasswordError}</div>}
      </div>

      <div>
        <input
          type='checkbox'
          id='agreeSMS'
          name='agreeSMS'
        />
        <label htmlFor='agreeSMS'>Do you agree to receive text SMS?</label>
      </div>

      <div>
        <input
          type='checkbox'
          id='agreeEmail'
          name='agreeEmail'
        />
        <label htmlFor='agreeEmail'>Do you agree to receive emails?</label>
      </div>

      <div>
        <input
          type='checkbox'
          id='agreeTerms'
          name='agreeTerms'
          required
        />
        <label htmlFor='agreeTerms'>
          Do you agree to our terms and conditions?
        </label>
      </div>

      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default Register;
