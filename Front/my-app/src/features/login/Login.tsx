import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loginAsync, selectLogged, getUserIdAsync} from './loginSlice';
import ResetPassword from '../reset_password/Resetpassword';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

/**
 * Component for displaying the login form and handling user login.
 *
 * The component renders a form with fields for username and password. Upon successful login,
 * a success message is displayed. If there's an error during login, an error message is shown.
 * If the user is already logged in, a success message will be shown indicating the successful
 * login, and the user will be redirected to the home page.
 *
 * @component
 */
const Login = () => {
  const dispatch = useAppDispatch();
  const logged = useAppSelector(selectLogged);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (logged) {
      dispatch(getUserIdAsync(sessionStorage.getItem('token') || ''));
    }
  }, [logged, dispatch]);

  /**
   * Handles the login action.
   * Dispatches the login action with the provided username and password. Upon successful login,
   * the success message will be displayed and the user's ID will be fetched. If there's an error
   * during login, an error message will be shown.
   */
  const handleLogin = () => {
    dispatch(loginAsync({ username, password }))
      .unwrap()
      .then(() => {
        setSuccessMessage('Successfully logged in');
        setIsPopupVisible(true);
        dispatch(getUserIdAsync(sessionStorage.getItem('token') || ''));
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsPopupVisible(true);
      });
  };

  /**
   * Closes the login success or error message popup.
   */
  const closePopupError = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsPopupVisible(false);
  };

  /**
   * Closes the login success message popup and navigates to the home page.
   */
  const closePopup = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsPopupVisible(false);
    navigate('/');
  };

  return (
    <div className="container" >
      <div className="row justify-content-center"  >
        <div className="col-lg-6 col-md-8"  >
          <div className="card mt-5" >
            <div className="card-body" style={{ backgroundColor: '#DDF7E3', border: '1px solid #000' }}>
              {logged ? (
                <>
                  {isPopupVisible && (
                    <div className="alert alert-success mt-3" role="alert">
                      <p>{successMessage}</p>
                      <button className="btn btn-secondary btn-success" onClick={closePopup}>Close</button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1 className="card-title text-center mb-4">Log In</h1>
                  <div className="mb-3">
                    <TextField
                      type="text"
                      label="Username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button variant="contained" color="success" onClick={handleLogin}>
                      Log In
                    </Button>
                  </div>
                  {isPopupVisible && (
                    <div className="alert alert-danger mt-3" role="alert">
                      <p>{errorMessage}</p>
                      <button className="btn btn-secondary btn-danger" onClick={closePopupError}>
                        Close
                      </button>
                    </div>
                  )}
                  <div className="text-center mt-4">
                    <ResetPassword />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
