import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { login, getUserId } from './loginAPI';

/**
 * Represents the state of the login slice.
 */
export interface loginState {
  logged: boolean;
  token: string;
  userId: number | null;
  error: string;
}

/**
 * Initial state of the login slice.
 */
const initialState: loginState = {
  logged: false,
  token: '',
  userId: null,
  error: '',
};

/**
 * An asynchronous thunk action to perform the login operation.
 * @function
 * @param {any} user1 - The login credentials of the user.
 * @returns {Promise<any>} The response data from the login API.
 */
export const loginAsync = createAsyncThunk(
  'login/login',
  async (user1: any) => {
    const response = await login(user1);
    return response.data;
  }
);

/**
 * An asynchronous thunk action to retrieve the user ID using the provided token.
 * @function
 * @param {string} token - The authentication token of the logged-in user.
 * @returns {Promise<number | null>} The user ID, if available.
 */
export const getUserIdAsync = createAsyncThunk(
  'login/getUserId',
  async (token: string) => {
    const userId = await getUserId(token);
    return userId;
  }
);

/**
 * Function to navigate to the home page.
 */
export const navigateToHome = () => {
  window.location.href = 'http://localhost:3000/';
};

/**
 * The login slice with the associated reducers and extra reducers.
 */
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    /**
     * Reducer function to handle logout action.
     * @function
     * @param {loginState} state - The current login state.
     */
    logout: (state) => {
      state.logged = false;
      state.token = '';
      state.userId = null;
      sessionStorage.clear();

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload.access.length > 0) {
          state.logged = true;
          state.token = action.payload.access;
          sessionStorage.setItem('token', state.token);
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.error('Login failed:', action.error.message);
        state.error = 'Incorrect username or password';
      })
      .addCase(getUserIdAsync.fulfilled, (state, action) => {
        state.userId = action.payload;
      })
      .addCase(getUserIdAsync.rejected, (state, action) => {
        console.error('Failed to get user ID:', action.error.message);
        state.error = 'Failed to retrieve user ID';
        navigateToHome();
      });
  },
});

export const { logout } = loginSlice.actions;

/**
 * Selector function to get the logged-in status from the login state.
 */
export const selectLogged = (state: RootState) => state.login.logged;

/**
 * Selector function to get the user ID from the login state.
 */
export const selectUserId = (state: RootState) => state.login.userId;

/**
 * Selector function to get the authentication token from the login state.
 */
export const selectToken = (state: RootState) => state.login.token;

/**
 * Default reducer for the login slice.
 */
export default loginSlice.reducer;
