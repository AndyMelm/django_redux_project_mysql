// src/features/reset_password/Resetpassword.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Resetpassword from './Resetpassword';

// Helper function to redirect the page
const mockWindowLocation = (url: string) => {
  // Create a temporary window object to replace the original window.location
  const tempWindow = { ...window };
  delete (tempWindow as any).location;
  (tempWindow as any).location = { href: url };
  Object.defineProperty(window, 'location', { value: (tempWindow as any).location, configurable: true });
};

test('renders the Resetpassword component', () => {
  render(<Resetpassword />);

  // Check if the heading is present
  const heading = screen.getByText('If you forgot your password, click here:');
  expect(heading).toBeInTheDocument();

  // Check if the button is present
  const resetButton = screen.getByRole('button', { name: 'Reset Password' });
  expect(resetButton).toBeInTheDocument();

  // Mock the redirect and click the button
  mockWindowLocation('http://127.0.0.1:8000/reset_password/');
  fireEvent.click(resetButton);

  // Check if the mock redirection occurred
  expect(window.location.href).toBe('http://127.0.0.1:8000/reset_password/');
});
