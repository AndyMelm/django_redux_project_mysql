// src/features/journal/Journal.test.tsx

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import JournalPage from './Journal';
import { store } from '../../app/store';

// Mock the axios module to avoid import issues
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({})),
}));

test('renders the Journal component', () => {
  render(
    <Provider store={store}>
      <JournalPage />
    </Provider>
  );

});
