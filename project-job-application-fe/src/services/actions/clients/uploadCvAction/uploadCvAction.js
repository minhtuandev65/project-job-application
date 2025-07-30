import { clientsApi } from "@/api";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../loadingActions/loadingActions";
import { STATUS_CODE_OK } from "@/config";
import { SET_UPLOAD_CV } from "@/types";
import { notificationFunction } from "@/libs";

export const uploadCvAction = (cv) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await clientsApi.uploadCv(cv);
      const message = result.message;
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_UPLOAD_CV,
          payload: result.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Upload CV failed!";
      notificationFunction("error", message, "Upload CV failed!");
    }
  };
};
