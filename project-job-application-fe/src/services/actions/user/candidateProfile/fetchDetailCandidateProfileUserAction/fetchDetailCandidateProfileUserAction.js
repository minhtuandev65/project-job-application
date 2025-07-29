import { userMangeCandidateProfile } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { displayLoadingAction, hideLoadingAction } from "@/services/actions/loadingActions/loadingActions";
import { SET_FETCH_DETAIL_CANDIDATEPROFILE } from "@/types";

// lấy chi tiết hồ sơ ứng tuyển của mình
export const fetchDetailCandidateProfileUserAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result =
        await userMangeCandidateProfile.fetchDetailsCandidateProfile(id);
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_FETCH_DETAIL_CANDIDATEPROFILE,
          payload: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message ||
        "Get data detail candidate profile failed!";
      notificationFunction("error", message, "Get data failed");
    }
  };
};
