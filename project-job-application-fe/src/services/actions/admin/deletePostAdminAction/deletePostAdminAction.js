import { adminManagePostApi } from "@/api";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { SET_DELETE_POST } from "@/types";

// Xóa bài đăng tuyển dụng
export const deletePostAdminAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminManagePostApi.deletePost(id);
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
      const message = error?.response?.data?.message || "Delete post failed!";
      notificationFunction("error", message, "Error");
    }
  };
};
