import { authApi } from "@/api";
import { notificationFunction } from "@/libs";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

export const forgotPasswordAction = (email, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const response = await authApi.forgotPassword(email);

      if (response?.status === 200 || response?.status === 201) {
        notificationFunction("success", "Please check your email.", "Success");
        navigate("/login");
      } else {
        // fallback nếu server trả status lạ mà không throw lỗi
        notificationFunction(
          "error",
          "Unexpected response from server.",
          "Forgot password failed"
        );
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Forgot password failed";
      notificationFunction("error", message, "Forgot password failed");
    }
  };
};