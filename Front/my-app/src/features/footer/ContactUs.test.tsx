// src/features/contactUs/ContactUs.test.tsx

import { render, screen } from '@testing-library/react';
import ContactUs from './ContactUs';

test('renders the ContactUs component', () => {
  render(<ContactUs />);

  // Test if the heading is present
  const headingElement = screen.getByRole('heading', { name: /contact us/i });
  expect(headingElement).toBeInTheDocument();

  // Test if the email link is present
  const emailLink = screen.getByRole('link', { name: /email/i });
  expect(emailLink).toBeInTheDocument();
  expect(emailLink).toHaveAttribute('href', 'mailto:andrey.melman93@gmail.com');

  // Test if the GitHub link is present
  const githubLink = screen.getByRole('link', { name: /github/i });
  expect(githubLink).toBeInTheDocument();
  expect(githubLink).toHaveAttribute('href', 'https://github.com/AndyMelm');

  // Test if the LinkedIn link is present
  const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
  expect(linkedinLink).toBeInTheDocument();
  expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/andrey-melman-636b49277/');
});
