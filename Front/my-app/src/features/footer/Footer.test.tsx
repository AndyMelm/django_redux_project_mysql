// src/features/footer/Footer.test.tsx

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

test('renders the Footer component', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  // Check if component elements are rendered
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Donations')).toBeInTheDocument();
  expect(screen.getByText('Tutorial')).toBeInTheDocument();
  expect(screen.getByText('Contact Us')).toBeInTheDocument();

  // Check if the correct links are present
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  expect(screen.getByRole('link', { name: 'Donations' })).toHaveAttribute('href', '/donations');
  expect(screen.getByRole('link', { name: 'Tutorial' })).toHaveAttribute('href', '/tutorial');
  expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact');
});
