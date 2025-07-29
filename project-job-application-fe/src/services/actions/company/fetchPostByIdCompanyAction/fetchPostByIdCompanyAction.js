import { companyApi } from "@/api";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";
import { SET_FETCH_COMPANY_BY_ID } from "@/types";
import { notificationFunction } from "@/libs";

export const fetchPostByIdCompanyAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await companyApi.fetchPostById(id);
      dispatch({
        type: SET_FETCH_COMPANY_BY_ID,
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
