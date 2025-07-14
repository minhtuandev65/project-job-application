import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../type/LoadingType/LoadingType";

const stateDefault = {
  isLoading: false,
};

export const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      return { ...state, isLoading: true };
    }
    case HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    default:
      return { ...state };
  }
};
