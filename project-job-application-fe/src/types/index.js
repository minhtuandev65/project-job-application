/* Nơi chứa các type để reducer sử dụng */
export { DISPlAY_LOADING, HIDE_LOADING } from "./loading/loadingTypes";
export {
  SET_FETCH_ALL_USER,
  SET_FETCH_DETAIL_USER,
  SET_FETCH_ALL_CANDIDATEPROFILE,
  SET_FETCH_DETAIL_CANDIDATEPROFILE,
  SET_LOCK_USER,
  SET_ACTIVATE_USER,
  SET_ACCEPTED_CANDIDATEPROFILE,
  SET_REJECTED_CANDIDATEPROFILE,
  SET_CREATE_NEW_POST,
  SET_DELETE_POST,
  SET_UPDATE_POST,
} from "./admin/adminTypes";
export {
  SET_LOGIN,
  SET_FETCH_MY_PROFILE,
  RESET_ALL_STATE,
} from "./auth/authTypes";
export {
  SET_FETCH_LIST_COMPANY,
  SET_FETCH_COMPANY_BY_ID,
} from "./company/companyTypes";
export { SET_UPDATE_PROFILE, SET_UPLOAD_CV } from "./user/userTypes";
export {
  SET_FETCH_DETAIL_CANDIDATEPROFILE,
  SET_FETCH_ALL_CANDIDATEPROFILE,
  SET_CREATE_NEW_CANDIDATEPROFILE,
} from "./user/candidateProfile/candidateProfileTypes";
export {
  SET_SEARCH_ELASTIC,
  SET_FILTER_COMPANIES,
} from "./user/search/searchTypes";
