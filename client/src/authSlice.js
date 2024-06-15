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
      console.log(state.isAuthenticated);
    },
    authSuccess: (state, action) => {
        if(state.isAuthenticated !== action.payload){
            state.isAuthenticated = action.payload;
        }
    }
  },
});

export const { loginSuccess, logoutSuccess, authSuccess } = authSlice.actions;
export default authSlice.reducer;