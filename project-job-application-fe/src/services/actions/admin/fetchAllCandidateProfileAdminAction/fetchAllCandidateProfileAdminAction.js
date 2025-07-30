import { adminManageCandidateProfileApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { SET_FETCH_ALL_CANDIDATEPROFILE_ADMIN } from "@/types";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

// Lấy danh sách hồ sơ ứng tuyển
export const fetchAllCandidateProfileAdminAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result =
        await adminManageCandidateProfileApi.fetchAllCandidateProfile();

      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_FETCH_ALL_CANDIDATEPROFILE_ADMIN,
          payload: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Get data candidate profile failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
