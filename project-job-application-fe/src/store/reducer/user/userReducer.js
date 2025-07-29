import {
  SET_CREATE_NEW_CANDIDATEPROFILE,
  SET_FETCH_ALL_CANDIDATEPROFILE,
  SET_FETCH_DETAIL_CANDIDATEPROFILE,
  SET_FILTER_COMPANIES,
  SET_SEARCH_ELASTIC,
} from "@/types";

const initialState = {
  listCandidateProfile: [],
  detailCandidateProfile: {},
  searchData: [],
  filterData: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_ELASTIC: {
      return {
        ...state,
        searchData: action.payload,
      };
    }
    case SET_FILTER_COMPANIES: {
      return {
        ...state,
        filterData: action.payload,
      };
    }
    case SET_FETCH_ALL_CANDIDATEPROFILE: {
      return {
        ...state,
        listCandidateProfile: action.payload,
      };
    }
    case SET_FETCH_DETAIL_CANDIDATEPROFILE: {
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
