import { usersServices } from "../../../../services/users/users/usersServices";
import { notificationFunction } from "../../../../utils/libs/Notification";
import { STATUS_CODE_OK } from "../../../../Utils/Setting/Config";
import {
  SET_UPLOAD_CV,
  SET_UPDATE_PROFILE,
} from "../../../type/Users/users/usersTypes";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";

export const uploadCvAction = (cv) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await usersServices.uploadCv(cv);
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

export const updateProfileAction = (profileData) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await usersServices.updateProfile(profileData);
      const message = result.data.message;
      console.log("update", result)
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
