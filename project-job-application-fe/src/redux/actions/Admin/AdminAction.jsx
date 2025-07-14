import { adminServices } from "../../../services/admin/adminServices";
import { notificationFunction } from "../../../utils/libs/Notification";
import { STATUS_CODE_CREATE, STATUS_CODE_OK } from "../../../Utils/Setting/Config";
import {
  SET_ACCEPTED_CANDIDATEPROFILE,
  SET_ACTIVATE_USER,
  SET_CREATE_NEW_POST,
  SET_DELETE_POST,
  SET_GET_ALL_CANDIDATEPROFILE,
  SET_GET_ALL_USER,
  SET_GET_DETAIL_CANDIDATEPROFILE,
  SET_GET_DETAIL_USER,
  SET_LOCK_USER,
  SET_REJECTED_CANDIDATEPROFILE,
  SET_UPDATE_POST,
} from "../../type/Admin/AdminTypes";

import {
  displayLoadingAction,
  hideLoadingAction,
} from "../LoadingAction/LoadingAction";

// lấy tất cả danh sách user
export const getAllUserAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.getAllUser();

      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_GET_ALL_USER,
          payload: result.data.users,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Get data user failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
// Lấy chi tiết một user
export const getDetailUserAction = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.getDetailUser(userId);

      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_GET_DETAIL_USER,
          payload: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Get data detail user failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
// chặn một user
export const lockUserAction = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.lockUser(userId);
      const message = result.data.message;
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_LOCK_USER,
          payload: result.data.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "lock user failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
// mở chặn user
export const activateUserAction = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.activateUser(userId);
      console.log(result.data.data)
      const message = result.data.message;
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_ACTIVATE_USER,
          payload: result.data.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Activate user failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
// Lấy danh sách hồ sơ ứng tuyển
export const getAllCandidateProfileAciotn = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.getAllCandidateProfile();
      
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
      notificationFunction("error", message, "Error");
    }
  };
};
// Lấy chi tiết hồ sơ ứng tuyển
export const getDetailsCandidateProfileAction = (candidateProfileId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.getDetailsCandidateProfile(
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
      notificationFunction("error", message, "Error");
    }
  };
};
// duyệt hồ sơ ứng tuyển
export const acceptedCandidateProfileAction = (candidateProfileId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.acceptedCandidateProfile(
        candidateProfileId
      );
      
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
// từ chối hồ sơ ứng tuyển
export const rejectedCandidateProfileAction = (candidateProfileId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.rejectedCandidateProfile(
        candidateProfileId
      );
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
// tạo bài đăng tuyển dụng
export const createNewPostAction = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.createNewPost(formData);
      const message = result.data.message;
      console.log(result.data.data)
      if (result.status === STATUS_CODE_CREATE) {
        dispatch({
          type: SET_CREATE_NEW_POST,
          payload: result.data.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Create new post failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
// Xóa bài đăng tuyển dụng
export const deletePostAction = (postId) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.deletePost(postId);
      const message = result.message;
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_DELETE_POST,
          payload: result.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Delete post failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
// Chỉnh sửa bài đăng tuyển dụng
export const updatePostAction = (postId, formData) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminServices.updatePost(postId, formData);
      const message = result.message;
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_UPDATE_POST,
          payload: result.data,
        });
        notificationFunction("success", message, "Success");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Delete post failed!";
      notificationFunction("error", message, "Error");
    }
  };
};