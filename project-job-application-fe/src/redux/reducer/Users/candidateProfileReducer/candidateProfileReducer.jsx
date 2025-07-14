import {
  SET_GET_ALL_CANDIDATEPROFILE,
  SET_GET_DETAIL_CANDIDATEPROFILE,
  SET_CREATE_NEW_CANDIDATEPROFILE,
} from "../../../type/Users/candidateProfileTypes/candidateProfileTypes";

const initialState = {
  listCandidateProfile: [],
  detailCandidateProfile: {},
};

export const candidateProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_ALL_CANDIDATEPROFILE: {
      return {
        ...state,
        listCandidateProfile: action.payload,
      };
    }
    case SET_GET_DETAIL_CANDIDATEPROFILE: {
      return {
        ...state,
        detailCandidateProfile: action.payload,
      };
    }
    case SET_CREATE_NEW_CANDIDATEPROFILE: {
      return {
        ...state,
        listCandidateProfile: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
