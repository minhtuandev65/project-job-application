import {
  SET_CREATE_NEW_POST,
  SET_DELETE_POST,
  SET_FETCH_COMPANY_BY_ID,
  SET_FETCH_LIST_COMPANY,
  SET_UPDATE_POST,
} from "@/types";

const initialState = {
  listPost: [],
  detailsPost: [],
};

export const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCH_LIST_COMPANY: {
      return {
        ...state,
        listPost: action.payload,
      };
    }
    case SET_FETCH_COMPANY_BY_ID: {
      return {
        ...state,
        detailsPost: action.payload,
      };
    }
    case SET_CREATE_NEW_POST: {
      return {
        ...state,
        listPost: action.payload,
      };
    }
    case SET_DELETE_POST: {
      const { _id, _destroy } = action.payload;
      const updatedData = state.listPost.map((data) =>
        data._id === _id ? { ...data, _destroy } : data
      );
      const updatedDataDetail =
        state.detailsPost && state.detailsPost._id === _id
          ? { ...state.detailsPost, _destroy }
          : state.detailsPost;
      return {
        ...state,
        listPost: updatedData,
        detailsPost: updatedDataDetail,
      };
    }
    case SET_UPDATE_POST: {
      const rawData = action.payload;
      const { _id, ...newData } = rawData;
      const updateData = state.listPost.map((data) =>
        data._id === _id ? { ...data, ...newData } : data
      );
      const updatedDataDetail =
        state.detailsPost && state.detailsPost._id === _id
          ? { ...state.detailsPost, ...newData }
          : state.detailsPost;
      return {
        ...state,
        listPost: updateData,
        detailsPost: updatedDataDetail,
      };
    }
    default: {
      return state;
    }
  }
};
