import { adminManageUserApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { SET_ACTIVATE_USER } from "@/types";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

// mở chặn user
export const activateUserAdminAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminManageUserApi.activateUser(id);
      console.log(result.data.data);
      const message = result.data.message;
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_ACTIVATE_USER,
          payload: result.data.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Activate user failed!";
      notificationFunction("error", message, "Error");
    }
  };
};