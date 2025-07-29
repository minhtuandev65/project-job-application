import { userApi } from "@/api";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../loadingActions/loadingActions";
import { STATUS_CODE_OK } from "@/config";
import { SET_UPDATE_PROFILE } from "@/types";
import { notificationFunction } from "@/libs";

export const updateProfileAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await userApi.updateProfile(data);
      const message = result.data.message;

      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_UPDATE_PROFILE,
          payload: result.data.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Update profile failed!";
      notificationFunction("error", message, "Update profile failed!");
    }
  };
};
