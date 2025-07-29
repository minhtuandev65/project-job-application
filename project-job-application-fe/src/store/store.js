import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  adminReducer,
  authReducer,
  companyReducer,
  loadingReducer,
  userReducer,
} from "./reducer";

const rootReducer = combineReducers({
  // Loading Reducer
  loadingReducer,
  /* admin Reducer */
  adminReducer,
  /* auth Reducer */
  authReducer,
  /* company Reducer */
  companyReducer,
  /* user Reducer */
  userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
