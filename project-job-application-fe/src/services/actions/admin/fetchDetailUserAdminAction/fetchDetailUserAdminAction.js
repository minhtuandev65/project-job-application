import { adminManageUserApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { SET_FETCH_DETAIL_USER_ADMIN } from "@/types";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../loadingActions/loadingActions";

// Lấy chi tiết một user
export const fetchDetailUserAdminAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminManageUserApi.fetchDetailUser(id);

      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_FETCH_DETAIL_USER_ADMIN,
          payload: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Get data detail user failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
