import {
  SET_SEARCH_ELASTIC,
  SET_FILTER_COMPANIES,
} from "../../../type/Users/search/searchTypes";

const initialState = {
  searchData: [],
  filterData: [],
};

export const searchReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};
