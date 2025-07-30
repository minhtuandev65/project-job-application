import { adminManageCandidateProfileApi } from "@/api";
import { notificationFunction } from "@/libs";
import { SET_FETCH_DETAIL_CANDIDATEPROFILE_ADMIN } from "@/types";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";
import { STATUS_CODE_OK } from "@/config";

// Lấy chi tiết hồ sơ ứng tuyển
export const fetchDetailCandidateProfileAdminAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result =
        await adminManageCandidateProfileApi.fetchDetailsCandidateProfile(id);
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_FETCH_DETAIL_CANDIDATEPROFILE_ADMIN,
          payload: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message ||
        "Get data detail candidate profile failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
