// src/features/footer/Donations.test.tsx

import { render, screen } from '@testing-library/react';
import Donations from './Donations';

test('renders the Donations component', () => {
  render(<Donations />);

  // Test if the title element with the test ID 'donations-title' is present
  const donationsElement = screen.getByTestId('donations-title');
  expect(donationsElement).toBeInTheDocument();

  // Test if the text 'We are constantly upgrading and planning to build new features.' is present
  expect(
    screen.getByText(/We are constantly upgrading and planning to build new features./)
  ).toBeInTheDocument();
});
