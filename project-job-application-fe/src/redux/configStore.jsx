import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { LoadingReducer } from "./reducer/LoadingReducer/LoadingReducer";
import { CompanyReducer } from "./reducer/CompanyReducer/CompanyReducer";
import { AuthReducer } from "./reducer/AuthReducer/AuthReducer";
import { AdminReducer } from "./reducer/Admin/AdminReducer";
import { candidateProfileReducer } from "./reducer/Users/candidateProfileReducer/candidateProfileReducer";
import { searchReducer } from "./reducer/Users/search/searchReducer";


const rootReducer = combineReducers({
  // Loading reducer
  LoadingReducer,
  //Auth
  AuthReducer,
  // Company reducer
  CompanyReducer,
  // Admin
  AdminReducer,
  // users
  candidateProfileReducer,
  searchReducer
});

export const store = configureStore({
  reducer: rootReducer,
});
