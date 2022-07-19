import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
}

export const logSlice = createSlice({
    name: 'loggedIn',
    initialState,
    reducers: {
      toggleStatus: state => !state,
      toggleLoggedIn: (state, action) => {
        if (action.payload) {
          state = {
            username: action.payload,
            isLoggedIn: true
          }
        }
        else {
          state = {
            isLoggedIn: false
          }
        }
      }
    },
})

export const { toggleStatus } = logSlice.actions;
export  default logSlice.reducer;

