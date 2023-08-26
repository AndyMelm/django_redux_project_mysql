// src/features/journal/Journal.test.tsx

import { render } from '@testing-library/react';
import { Provider } from 'react-redux'; 
import { store } from '../../app/store';
import ViewandUpdate from './VIewandUpdate';

// Mock the axios module to avoid import issues
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({})),
}));

test('renders the ViewandUpdate component', () => {
  render(
    <Provider store={store}>
      <ViewandUpdate />
    </Provider>
  );
});
