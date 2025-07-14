import { companyServices } from "../../../services/Company/CompanyServices";
import { notificationFunction } from "../../../utils/libs/Notification";
import {
  SET_GET_COMPANY_BY_ID,
  SET_GET_LIST_COMPANY,
} from "../../type/CompanyTypes/CompanyTypes";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../LoadingAction/LoadingAction";

// lấy danh sách công ty
export const getListPostAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await companyServices.getListPost();
      dispatch({
        type: SET_GET_LIST_COMPANY,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Get data company list failed!";
      notificationFunction("error", message, "Get data failed!");
    }
  };
};
export const getPostByIdAction = (companyId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await companyServices.getPostById(companyId);
      dispatch({
        type: SET_GET_COMPANY_BY_ID,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Get data details company failed!";
      notificationFunction("error", message, "Get data failed");
    }
  };
};
