import { DISPlAY_LOADING, HIDE_LOADING } from "@/types";

const stateDefault = {
  isLoading: false,
};
export const loadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DISPlAY_LOADING: {
      return { ...state, isLoading: true };
    }
    case HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    default:
      return { ...state };
  }
};
