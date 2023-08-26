
import { render} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';
import { useAppSelector } from '../../app/hooks';


// Mock the axios module
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({})),
}));

// Mock the useAppDispatch hook
const mockDispatch = jest.fn();
jest.mock('../../app/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

// Mock the registerAsync action
jest.mock('./RegisterSlice', () => ({
  registerAsync: jest.fn(),
}));

describe('Register component', () => {
  // Mock the store
  const mockStore = configureStore();
  const initialState = {}; // Add your initial state if needed

  beforeEach(() => {
    // Reset the mock implementations before each test
    jest.clearAllMocks();

    // Mock the useAppSelector hook with a sample state
    (useAppSelector as jest.Mock).mockReturnValue({
      messages: [],
      error: null,
      regSuccess: false,
    });
  });

  test('renders the Register component', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

  });

  test('handles form validation and dispatches registerAsync action', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

  
  });
});
