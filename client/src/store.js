import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'; 
import domainReducer from './domainSlice'; 

// const initialState = {
//   domain: { domains: ['Eldercare', 'Construction'] },
// }

export const store = configureStore({
  reducer: {
    auth: authReducer,
    domain: domainReducer
  },
  //preloadedState: initialState,
})