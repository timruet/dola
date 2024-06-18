import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Initially, no user is logged in
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    authSuccess: (state, action) => {
        if(state.user !== action.payload.user && state.isAuthenticated !== action.payload.isAuthenticated){
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
        }
    }
  },
});

export const { loginSuccess, logoutSuccess, authSuccess } = authSlice.actions;
export default authSlice.reducer;