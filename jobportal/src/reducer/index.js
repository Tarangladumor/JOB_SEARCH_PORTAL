import { combineReducers } from "@reduxjs/toolkit";
import authReducer from'../slices/authSlice';
import profileReducer from '../slices/profileSlice'

export const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileReducer
});

export default rootReducer;