import { candidateProfileServices } from "../../../../services/users/candidateProfile/candidateProfileServices";
import { notificationFunction } from "../../../../utils/libs/Notification";
import {
  STATUS_CODE_CREATE,
  STATUS_CODE_OK,
} from "../../../../Utils/Setting/Config";
import {
  SET_GET_ALL_CANDIDATEPROFILE,
  SET_GET_DETAIL_CANDIDATEPROFILE,
  SET_CREATE_NEW_CANDIDATEPROFILE,
} from "../../../type/Users/candidateProfileTypes/candidateProfileTypes";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";

// lấy tất cả hồ sơ ứng tuyển của mình
export const getAllCandidateProfileAction = (status) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await candidateProfileServices.getAllCandidateProfile(
        status
      );
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_GET_ALL_CANDIDATEPROFILE,
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
// lấy chi tiết hồ sơ ứng tuyển của mình
export const getDetailCandidateProfileAction = (candidateProfileId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await candidateProfileServices.getDetailsCandidateProfile(
        candidateProfileId
      );
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_GET_DETAIL_CANDIDATEPROFILE,
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
// tạo mới hồ sơ ứng tuyển
export const createNewCandidateProfileAction = (candidateProfileData) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await candidateProfileServices.createNewCandidateProfile(
        candidateProfileData
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
