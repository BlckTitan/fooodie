'use client'
import { configureStore, current } from '@reduxjs/toolkit';
import paginationReducer from '@/app/GlobalRedux/paginationSlice/paginationSlice'

const store = configureStore({
  reducer: {
    currentPageData: paginationReducer,
  },
});
export default  store;