import { adminManagePostApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";
import { SET_UPDATE_POST } from "@/types";
import { notificationFunction } from "@/libs";

// Chỉnh sửa bài đăng tuyển dụng
export const updatePostAdminAction = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminManagePostApi.updatePost(id, data);
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
      const message = error?.response?.data?.message || "Delete post failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
