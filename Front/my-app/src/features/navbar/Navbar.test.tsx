// src/features/navbar/Navbar.test.tsx

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the loginSlice selectors for the test
jest.mock('../login/loginSlice', () => ({
  selectLogged: jest.fn(),
  selectToken: jest.fn(),
  logout: jest.fn(),
}));

describe('Navbar component', () => {
  test('renders the Navbar component with correct links', () => {
    // Mock the state for userHasToken
    const mockUserHasToken = true;
    jest.mock('../../app/hooks', () => ({
      useAppSelector: jest.fn((selector) => {
        if (selector === 'selectLogged') {
          return mockUserHasToken;
        }
        if (selector === 'selectToken') {
          return 'mocked-token';
        }
        return null;
      }),
      useAppDispatch: jest.fn(),
    }));

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );


  });
});
