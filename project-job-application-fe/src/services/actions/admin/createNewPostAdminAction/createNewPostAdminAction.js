import { adminManagePostApi } from "@/api";
import { STATUS_CODE_CREATE } from "@/config";
import { SET_CREATE_NEW_POST } from "@/types";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../loadingActions/loadingActions";
import { notificationFunction } from "@/libs";

// tạo bài đăng tuyển dụng
export const createNewPostAdminAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await adminManagePostApi.createNewPost(data);
      const message = result.data.message;
      console.log(result.data.data);
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
