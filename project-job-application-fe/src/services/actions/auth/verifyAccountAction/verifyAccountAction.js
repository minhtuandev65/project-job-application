import { authApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

export const verifyAccountAction = ({ email, token }, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const response = await authApi.verifyEmail({ email, token });
      if (response?.status === STATUS_CODE_OK) {
        notificationFunction(
          "success",
          "Authentication successful!",
          "Success"
        );
        navigate("/login");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message =
        error?.response?.data?.message || "Verify account failed!";
      notificationFunction("error", message, "Verify account failed");
    }
  };
};
