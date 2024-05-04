// In your authentication slice file, e.g., authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
 name: 'auth',
 initialState: {
    token: null,
 },
 reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    // Other reducers...
 },
});

export const { saveToken } = authSlice.actions;

export default authSlice.reducer;