import { clientsMangeCandidateProfile } from "@/api";
import { STATUS_CODE_CREATE } from "@/config";
import { notificationFunction } from "@/libs";
import { displayLoadingAction, hideLoadingAction } from "@/services/actions/loadingActions/loadingActions";
import { SET_CREATE_NEW_CANDIDATEPROFILE } from "@/types";

// tạo mới hồ sơ ứng tuyển
export const createNewCandidateProfileUserAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await clientsMangeCandidateProfile.createNewCandidateProfile(
        data
      );
      const message = result.data.message;
      if (result.status === STATUS_CODE_CREATE) {
        dispatch({
          type: SET_CREATE_NEW_CANDIDATEPROFILE,
          payload: result.data.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Create candidate profile failed!";
      notificationFunction("error", message, "Create failed");
    }
  };
};
