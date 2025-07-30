import {
  SET_ACCEPTED_CANDIDATEPROFILE,
  SET_ACTIVATE_USER,
  SET_FETCH_ALL_CANDIDATEPROFILE_ADMIN,
  SET_FETCH_ALL_USER_ADMIN,
  SET_FETCH_DETAIL_CANDIDATEPROFILE_ADMIN,
  SET_FETCH_DETAIL_USER_ADMIN,
  SET_LOCK_USER,
  SET_REJECTED_CANDIDATEPROFILE,
} from "@/types";

const initialState = {
  userList: [],
  userDetail: {},
  candidateProfileList: [],
  candidateProfileDetail: {},
};
export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCH_ALL_USER_ADMIN: {
      return {
        ...state,
        userList: action.payload,
      };
    }
    case SET_FETCH_DETAIL_USER_ADMIN: {
      return {
        ...state,
        userDetail: action.payload,
      };
    }
    case SET_LOCK_USER: {
      const { _id, isActive } = action.payload;
      const updatedUsers = state.userList.map((data) =>
        data._id === _id ? { ...data, isActive } : data
      );
      const updatedDetail =
        state.userDetail && state.userDetail._id === _id
          ? { ...state.userDetail, isActive }
          : state.userDetail;
      return {
        ...state,
        userList: updatedUsers,
        userDetail: updatedDetail,
      };
    }
    case SET_ACTIVATE_USER: {
      const { _id, isActive } = action.payload;
      const updatedUsers = state.userList.map((data) =>
        data._id === _id ? { ...data, isActive } : data
      );
      const updatedDetail =
        state.userDetail && state.userDetail._id === _id
          ? { ...state.userDetail, isActive }
          : state.userDetail;
      return {
        ...state,
        userList: updatedUsers,
        userDetail: updatedDetail,
      };
    }
    case SET_FETCH_ALL_CANDIDATEPROFILE_ADMIN: {
      return {
        ...state,
        candidateProfileList: action.payload,
      };
    }
    case SET_FETCH_DETAIL_CANDIDATEPROFILE_ADMIN: {
      return {
        ...state,
        candidateProfileDetail: action.payload,
      };
    }
    case SET_ACCEPTED_CANDIDATEPROFILE: {
      const { _id, status } = action.payload;
      const updatedProfile = state.candidateProfileList.map((data) =>
        data._id === _id ? { ...data, status } : data
      );
      const updatedProfileDetail =
        state.candidateProfileDetail && state.candidateProfileDetail._id === _id
          ? { ...state.candidateProfileDetail, status }
          : state.candidateProfileDetail;
      return {
        ...state,
        candidateProfileList: updatedProfile,
        candidateProfileDetail: updatedProfileDetail,
      };
    }
    case SET_REJECTED_CANDIDATEPROFILE: {
      const { _id, status } = action.payload;
      const updatedProfile = state.candidateProfileList.map((data) =>
        data._id === _id ? { ...data, status } : data
      );
      const updatedProfileDetail =
        state.candidateProfileDetail && state.candidateProfileDetail._id === _id
          ? { ...state.candidateProfileDetail, status }
          : state.candidateProfileDetail;
      return {
        ...state,
        candidateProfileList: updatedProfile,
        candidateProfileDetail: updatedProfileDetail,
      };
    }
    default: {
      return state;
    }
  }
};
