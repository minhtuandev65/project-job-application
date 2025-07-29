import { adminManageCandidateProfileApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { SET_ACCEPTED_CANDIDATEPROFILE } from "@/types";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

// duyệt hồ sơ ứng tuyển
export const acceptedCandidateProfileAdminAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result =
        await adminManageCandidateProfileApi.acceptedCandidateProfile(id);

      const message = result.message;
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_ACCEPTED_CANDIDATEPROFILE,
          payload: result.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Accepted candidate profile failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
