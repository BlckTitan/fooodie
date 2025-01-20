'use client'
import { createSlice } from '@reduxjs/toolkit'

export const paginationSlice = createSlice({
    name: 'paginationSlice',
    initialState: {
        currentPage: 1,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
    }
});
export const { s,
    setCurrentPage
} = paginationSlice.actions
export default paginationSlice.reducer