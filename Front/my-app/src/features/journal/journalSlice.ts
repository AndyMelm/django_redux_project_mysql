import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAll, createEntry, updateEntry, deleteEntry } from './journalAPI';

// Interface for the JournalState
export interface JournalState {
  logged: boolean;
  journals: any[];
  viewedData: any | null;
}

// Initial state for the JournalState
const initialState: JournalState = {
  logged: false,
  journals: [],
  viewedData: null,
};

// Create an async thunk to get all journals for a user
export const getAllJournals = createAsyncThunk('journal/getAll', async (userid: number) => {
  const journals = await getAll(userid);
  return journals;
});

// Create an async thunk to create a new journal entry
export const createJournalEntry = createAsyncThunk('journal/createEntry', async (formData: any) => {
  const newEntry = await createEntry(formData);
  return newEntry;
});

// Create an async thunk to update an existing journal entry
export const updateJournalEntry = createAsyncThunk(
  'journal/updateEntry',
  async (updatedFields: any) => {
    const { id } = updatedFields; // Destructure the id from updatedFields
    const updatedEntry = await updateEntry(id, updatedFields);
    return updatedEntry;
  }
);

// Create an async thunk to delete a journal entry
export const deleteJournalEntry = createAsyncThunk('journal/deleteEntry', async (entryId: number) => {
  await deleteEntry(entryId);
  return entryId;
});

// Create a plain action to update the viewed journal entry data
export const updateViewJournal = createAction<any>('journal/updateViewJournal');

// Create the journalSlice using createSlice from Redux Toolkit
export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    logout: (state) => {
      state.logged = false;
      sessionStorage.clear();
    },
    setViewedData: (state, action) => {
      state.viewedData = action.payload;
    },
    closeViewedData: (state) => {
      state.viewedData = null;
    },
  },
  // Define extra reducers to handle the async thunks' fulfilled actions
  extraReducers: (builder) => {
    builder
      .addCase(updateViewJournal, (state, action) => {
        state.viewedData = action.payload;
      })
      .addCase(getAllJournals.fulfilled, (state, action) => {
        state.journals = action.payload;
      })
      .addCase(createJournalEntry.fulfilled, (state, action) => {
        state.journals.push(action.payload);
      })
      .addCase(updateJournalEntry.fulfilled, (state, action) => {
        const updatedIndex = state.journals.findIndex((entry) => entry.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.journals[updatedIndex] = action.payload;
        }
      })
      .addCase(deleteJournalEntry.fulfilled, (state, action) => {
        state.journals = state.journals.filter((entry) => entry.id !== action.payload);
      });
  },

});

// Export actions and selectors from the slice
export const { logout, closeViewedData } = journalSlice.actions;
export const selectJournals = (state: RootState) => state.journal.journals;
export const selectViewedData = (state: RootState) => state.journal.viewedData;

// Export the reducer
export default journalSlice.reducer;
