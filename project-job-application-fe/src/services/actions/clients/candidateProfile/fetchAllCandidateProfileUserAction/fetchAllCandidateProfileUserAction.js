import { clientsMangeCandidateProfile } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "@/services/actions/loadingActions/loadingActions";
import { SET_FETCH_ALL_CANDIDATEPROFILE_USER } from "@/types";

// lấy tất cả hồ sơ ứng tuyển của mình
export const fetchAllCandidateProfileUserAction = (status) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await clientsMangeCandidateProfile.fetchAllCandidateProfile(
        status
      );
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_FETCH_ALL_CANDIDATEPROFILE_USER,
          payload: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Get data candidate profile failed!";
      notificationFunction("error", message, "Get data failed");
    }
  };
};
