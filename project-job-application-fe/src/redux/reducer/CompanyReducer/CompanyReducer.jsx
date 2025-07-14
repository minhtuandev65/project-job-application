import {
  SET_GET_COMPANY_BY_ID,
  SET_GET_LIST_COMPANY,
} from "../../type/CompanyTypes/CompanyTypes";
import {
  SET_CREATE_NEW_POST,
  SET_DELETE_POST,
  SET_UPDATE_POST,
} from "../../type/Admin/AdminTypes";

const initialState = {
  listCompany: [],
  detailsCompany: [],
};

export const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_LIST_COMPANY: {
      return {
        ...state,
        listCompany: action.payload,
      };
    }
    case SET_GET_COMPANY_BY_ID: {
      return {
        ...state,
        detailsCompany: action.payload,
      };
    }
    case SET_CREATE_NEW_POST: {
      return {
        ...state,
        listCompany: action.payload,
      };
    }
    case SET_DELETE_POST: {
      const { _id, _destroy } = action.payload;
      const updatedData = state.listCompany.map((data) =>
        data._id === _id ? { ...data, _destroy } : data
      );
      const updatedDataDetail =
        state.detailsCompany && state.detailsCompany._id === _id
          ? { ...state.detailsCompany, _destroy }
          : state.detailsCompany;
      return {
        ...state,
        listCompany: updatedData,
        detailsCompany: updatedDataDetail,
      };
    }
    case SET_UPDATE_POST: {
      const rawData = action.payload;
      const { _id, ...newData } = rawData;
      const updateData = state.listCompany.map((data) =>
        data._id === _id ? { ...data, ...newData } : data
      );
      const updatedDataDetail =
        state.detailsCompany && state.detailsCompany._id === _id
          ? { ...state.detailsCompany, ...newData }
          : state.detailsCompany;
      return {
        ...state,
        listCompany: updateData,
        detailsCompany: updatedDataDetail,
      };
    }
    default: {
      return state;
    }
  }
};
