
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({})),
}));

test('renders the Login component', () => {
  render(
   
    <MemoryRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </MemoryRouter>
  );
  // Check if the Log In heading is present
  const heading = screen.getByText('Log In', { selector: 'h1' });
  expect(heading).toBeInTheDocument();

  // Check if the Username input field is present
  const usernameInput = screen.getByLabelText('Username');
  expect(usernameInput).toBeInTheDocument();

  // Check if the Password input field is present
  const passwordInput = screen.getByLabelText('Password');
  expect(passwordInput).toBeInTheDocument();

  // Check if the Log In button is present
  const loginButton = screen.getByRole('button', { name: 'Log In' });
  expect(loginButton).toBeInTheDocument();
});
