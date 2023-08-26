// Tutorial.test.tsx

import { render, screen } from '@testing-library/react';
import Tutorial from './Tutorial';

test('renders the Tutorial component', () => {
  render(<Tutorial />);

  // Check if component elements are rendered
  expect(screen.getByRole('heading', { level: 2, name: /Tutorial/i })).toBeInTheDocument();
  expect(
    screen.getByText(/Welcome to the tutorial section! We have prepared a detailed video tutorial to help you get started with using our app./)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Follow along with the instructions in the video to make the most out of the features and functionalities./)
  ).toBeInTheDocument();

  // Check if the YouTube link is present
  const youtubeLink = screen.getByText(/Watch the tutorial video on YouTube/i);
  expect(youtubeLink).toBeInTheDocument();

  // Check if the FontAwesomeIcon component with the YouTube icon is present
  const iconElement = screen.getByTestId('youtube-icon');
  expect(iconElement).toBeInTheDocument();
  expect(iconElement.tagName.toLowerCase()).toBe('svg');
  expect(iconElement).toHaveClass('svg-inline--fa fa-youtube');
});
