import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const logSlice = createSlice({
    name: 'loggedIn',
    initialState,
    reducers: {
      toggleStatus: state => !state,
      toggleLoggedIn: (state, action) => action.payload
    },
})

export const { toggleStatus, toggleLoggedIn } = logSlice.actions;
export  default logSlice.reducer;
