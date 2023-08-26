import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { registerAsync, selectMessages, selectRegSuccess } from './RegisterSlice';

/**
 * Represents the Register component.
 * @function
 * @returns {JSX.Element} JSX component for registration form.
 */
const Register = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const messages = useAppSelector(selectMessages);
  const regSuccess = useAppSelector(selectRegSuccess);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  /**
   * Handles the registration process.
   * @function
   */
  const handleRegister = () => {
    // Perform form validation
    if (!username || !password || !email) {
      alert('Please fill in all the fields.');
      return;
    }

    // Perform email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Perform password validation
    if (password.length < 8) {
      alert('Password must contain at least 8 characters.');
      return;
    }

    const containsPersonalInfo = [
      username.toLowerCase(),
      email.toLowerCase(),
    ].some(info => password.toLowerCase().includes(info));

    if (containsPersonalInfo) {
      alert('Password can\'t be too similar to your other personal information.');
      return;
    }

    const commonPasswords = [
      'password',
      '12345678',
      '123456',
      '1234',
    ];

    if (commonPasswords.includes(password.toLowerCase())) {
      alert('Password can\'t be a commonly used password.');
      return;
    }

    if (/^\d+$/.test(password)) {
      alert('Password can\'t be entirely numeric.');
      return;
    }

    // Dispatch the registration async thunk
    dispatch(registerAsync({ username, password, email })).then(() => {
      setIsPopupVisible(true);
    });
  };

  /**
   * Closes the success/error popup.
   */
  const closePopup = () => {
    setIsPopupVisible(false);
    if (regSuccess) {
      window.location.href = 'http://localhost:3000/';
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card mt-5">
            <div className="card-body" style={{ backgroundColor: '#DDF7E3', border: '1px solid #000' }}>
              <h1 className="card-title text-center mb-4">Register Form</h1>
              <p className="text-center">
                *Note we are not validating your email, but if you forget your password, only valid emails will receive a reset password email.
              </p>

              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
              /><br /><br />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              /> <br /><br />

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              /> <br /> <br />

              <Button
                variant="contained"
                color="success"
                className="w-100"
                onClick={handleRegister}
              >
                Register
              </Button>

              {isPopupVisible && (
                <div className={`alert ${regSuccess ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                  {messages.map((message, index) => (
                    <p key={index} className={regSuccess ? 'text-success' : 'text-danger'}>{message}</p>
                  ))}
                  <button className={`btn ${regSuccess ? 'btn-success' : 'btn-danger'}`} onClick={closePopup}>
                    Close
                  </button>
                </div>
              )}

              {isPopupVisible && <div className="overlay" onClick={closePopup} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
