import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import loginReducer from '../features/login/loginSlice';
import registerReducer from '../features/register/RegisterSlice';
import journalReducer from '../features/journal/journalSlice';
import showdataReducer from '../features/showdata/showdataSlice';



export const store = configureStore({
  reducer: {

    login: loginReducer,
    register: registerReducer,
    journal: journalReducer, 
    showdata:showdataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
