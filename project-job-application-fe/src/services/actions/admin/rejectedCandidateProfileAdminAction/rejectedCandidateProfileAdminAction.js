import { adminManageCandidateProfileApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { SET_REJECTED_CANDIDATEPROFILE } from "@/types";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../loadingActions/loadingActions";

// từ chối hồ sơ ứng tuyển
export const rejectedCandidateProfileAdminAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result =
        await adminManageCandidateProfileApi.rejectedCandidateProfile(id);
      const message = result.message;
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_REJECTED_CANDIDATEPROFILE,
          payload: result.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Rejected candidate profile failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
