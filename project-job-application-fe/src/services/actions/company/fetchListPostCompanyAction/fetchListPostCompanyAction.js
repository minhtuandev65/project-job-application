import { companyApi } from "@/api";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../loadingActions/loadingActions";
import { SET_FETCH_LIST_COMPANY } from "@/types";
import { notificationFunction } from "@/libs";

// lấy danh sách công ty
export const fetchListPostCompanyAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await companyApi.fetchListPost();
      dispatch({
        type: SET_FETCH_LIST_COMPANY,
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
