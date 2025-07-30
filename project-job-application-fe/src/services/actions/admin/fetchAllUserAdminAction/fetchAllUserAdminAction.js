import { adminManageUserApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { SET_FETCH_ALL_USER_ADMIN } from "@/types";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

// lấy tất cả danh sách user
export const fetchAllUserAdminAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminManageUserApi.fetchAllUser();

      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_FETCH_ALL_USER_ADMIN,
          payload: result.data.users,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Get data user failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
