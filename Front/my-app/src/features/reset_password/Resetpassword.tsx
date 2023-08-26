
import Button from '@mui/material/Button';

/**
 * Component for displaying the "Reset Password" section with a button to initiate the password reset process.
 *
 * The component renders a message instructing the user to click the button if they forgot their password.
 * When the "Reset Password" button is clicked, the user will be redirected to the password reset page.
 *
 * @component
 */
const Resetpassword = () => {
  return (
    <div>
      <h3>If you forgot your password, click here:</h3>
      <Button variant="contained" color="error" onClick={() => (window.location.href = 'http://127.0.0.1:8000/reset_password/')}>
        Reset Password
      </Button>
    </div>
  );
};

export default Resetpassword;
