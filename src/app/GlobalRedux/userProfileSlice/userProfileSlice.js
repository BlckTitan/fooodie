'use client'
import { createSlice } from '@reduxjs/toolkit'

export const userProfileSlice = createSlice({
    name: 'userProfileSlice',
    initialState: {
        step: 1,
        personalInfo: ['', '', ''],
        plan: ['', '', ''], 
        addOns: ['', '', ''],
        errorMessage: '',   
        errorField: ''
    },
    reducers: {
        nextStep: (state) => {
            state.step += 1
        },
        prevStep: (state) => {
            state.step -= 1
        },
        changeStep: (state, action) => {
            state.step -= action.payload
        },
        getPersonalInfo: (state, action) => {
            state.personalInfo = action.payload
        },
        getPlan: (state, action) => {
            state.plan = action.payload
        },
        getAddOns: (state, action) => {
            state.addOns = action.payload
        },
        getErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },
        getErrorField: (state, action) => {
            state.errorField = action.payload
        }
    }
});
export const { 
    nextStep, prevStep, changeStep,
    getPersonalInfo, getPlan, getAddOns,
    getErrorMessage, getErrorField
} = userProfileSlice.actions
export default userProfileSlice.reducer