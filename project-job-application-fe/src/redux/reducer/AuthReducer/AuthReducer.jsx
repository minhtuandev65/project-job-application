import {
  SET_LOGIN,
  SET_GET_MY_PROFILE,
  RESET_ALL_STATE,
} from "../../type/AuthType/AuthType";
import {
  SET_UPLOAD_CV,
  SET_UPDATE_PROFILE,
} from "../../type/Users/users/usersTypes";
const initialState = {
  user: null,
  userProfile: {},
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN: {
      return { ...state, user: action.payload };
    }
    case SET_GET_MY_PROFILE: {
      return { ...state, userProfile: action.payload };
    }
    case SET_UPLOAD_CV: {
      const { _id, cvUrl } = action.payload;
      const updatedCv =
        state.userProfile && state.userProfile._id === _id
          ? { ...state.userProfile, cvUrl }
          : state.userProfile;
      return {
        ...state,
        userProfile: updatedCv,
      };
    }
    case SET_UPDATE_PROFILE: {
      const { _id, ...data } = action.payload;
      const updateData =
        state.userProfile && state.userProfile._id === _id
          ? { ...state.userProfile, ...data }
          : state.userProfile;
      return {
        ...state,
        userProfile: updateData,
      };
    }
    case RESET_ALL_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};
