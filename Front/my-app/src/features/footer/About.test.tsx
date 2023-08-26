// src/features/footer/About.test.tsx

import { render, screen } from '@testing-library/react';
import About from './About';

test('renders the About component', () => {
  render(<About />);

  // Test if the main heading "Welcome to Your Trading Journal" is present
  const mainHeading = screen.getByRole('heading', { level: 4 });
  expect(mainHeading).toHaveTextContent('Welcome to Your Trading Journal');

  // Test if the "Effortless Trade Logging" section is present
  const effortlessLoggingSection = screen.getByText('Effortless Trade Logging');
  expect(effortlessLoggingSection).toBeInTheDocument();

  // Test if the "Comprehensive Trade Analysis" section is present
  const comprehensiveAnalysisSection = screen.getByText('Comprehensive Trade Analysis');
  expect(comprehensiveAnalysisSection).toBeInTheDocument();

  // Test if the "Get Started Today" section is present
  const getStartedSection = screen.getByText('Get Started Today');
  expect(getStartedSection).toBeInTheDocument();

  // Test if the "Created by AndyMelm" section is present
  const createdBySection = screen.getByText('Created by AndyMelm:');
  expect(createdBySection).toBeInTheDocument();

  // Test if the GitHub link is present
  const githubLink = screen.getByRole('link', { name: /github/i });
  expect(githubLink).toHaveAttribute('href', 'https://github.com/AndyMelm');

  // Test if the LinkedIn link is present
  const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
  expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/andrey-melman-636b49277/');
});
