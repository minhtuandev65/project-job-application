import { authApi } from "@/api";
import { notificationFunction } from "@/libs";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

/* Đặt lại mật khẩu */
export const resetPasswordAction = (password, token) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      await authApi.resetPassword(password, token);
      notificationFunction("success", "Password reset successful!", "Success");
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Password reset failed!";
      notificationFunction("error", message, "Password reset failed!");
    }
  };
};
