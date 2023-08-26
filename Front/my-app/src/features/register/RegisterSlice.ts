import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { register } from './RegisterAPI';

/**
 * Represents the state structure for user registration.
 */
export interface registerState {
    logged: boolean;
    token: string;
    messages: string[];
    error: string;
    registrationSuccess: boolean;
}

/**
 * Represents the initial state for user registration.
 */
const initialState: registerState = {
    logged: false,
    token: '',
    messages: [],
    error: '',
    registrationSuccess: false,
};

/**
 * Asynchronous thunk for user registration.
 * @function
 * @param {any} user - The user data to be registered.
 * @returns {Promise<any>} A Promise that resolves with the response data on successful registration.
 * @throws {Error} Rejects with an error containing the error message if the registration fails.
 */
export const registerAsync = createAsyncThunk(
    'register/register',
    async (user: any) => {
        const response = await register(user);
        return response.data;
    }
);

/**
 * Slice for user registration state management.
 * @type {Slice}
 */
export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        logout: (state) => {
            state.logged = false;
            state.token = '';
            sessionStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.messages = [action.payload.message];
                state.error = '';
                state.registrationSuccess = true;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                if (action.error.message) {
                    state.messages = [action.error.message];
                } else {
                    state.messages = [];
                }
                state.error = 'An error occurred during registration. Please try another credential';
                state.registrationSuccess = false; 
            });
    },
});

export const { logout } = registerSlice.actions;

/**
 * Selector function to get the logged-in status from the register state.
 */
export const selectLogged = (state: RootState) => state.register.logged;

/**
 * Selector function to get the error message from the register state.
 */
export const selectError = (state: RootState) => state.register.error;

/**
 * Selector function to get the array of messages from the register state.
 */
export const selectMessages = (state: RootState) => state.register.messages;

/**
 * Selector function to get the registration success status from the register state.
 */
export const selectRegSuccess = (state: RootState) => state.register.registrationSuccess;

/**
 * Default reducer for the register slice.
 */
export default registerSlice.reducer;
