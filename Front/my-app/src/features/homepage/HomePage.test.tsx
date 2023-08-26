// src/features/homePage/HomePage.test.tsx

import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders the HomePage component', () => {
  render(<HomePage />);

  // Check if the main heading "Welcome to Your Trading Journal" is present
  const mainHeading = screen.getByText(/Welcome to Your Trading Journal/i);
  expect(mainHeading).toBeInTheDocument();

  // Check if the first paragraph is present
  const firstParagraph = screen.getByText(
    /With our user-friendly interface, logging your trades has never been easier./i
  );
  expect(firstParagraph).toBeInTheDocument();

  // Check if the second paragraph is present
  const secondParagraph = screen.getByText(
    /Our app provides powerful analytical tools and insightful statistics to help you gain a deeper understanding of your trading performance./i
  );
  expect(secondParagraph).toBeInTheDocument();

  // Check if the third paragraph is present
  const thirdParagraph = screen.getByText(
    /We have seamlessly integrated TradingView charts into our app, eliminating the need to switch browser tabs or open external applications./i
  );
  expect(thirdParagraph).toBeInTheDocument();

  // Check if the "Start journaling your trades and take control of your trading journey" paragraph is present
  const lastParagraph = screen.getByText(
    /Start journaling your trades and take control of your trading journey./i
  );
  expect(lastParagraph).toBeInTheDocument();

  // Check if the "Sign up now and unlock the full potential of our feature-rich trading journal" paragraph is present
  const signUpParagraph = screen.getByText(
    /Sign up now and unlock the full potential of our feature-rich trading journal./i
  );
  expect(signUpParagraph).toBeInTheDocument();
});
