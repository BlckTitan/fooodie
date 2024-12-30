'use client'
import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '@/app/GlobalRedux/userProfileSlice/userProfileSlice'

const store = configureStore({
  reducer: {
    userProfileData: userProfileReducer,
  },
});
export default  store;