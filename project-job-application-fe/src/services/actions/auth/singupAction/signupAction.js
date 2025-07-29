import { authApi } from "@/api";
import { notificationFunction } from "@/libs";
import { STATUS_CODE_CREATE } from "@/config";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

// Tạo action để đăng ký
export const signupAction = (data, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const response = await authApi.signup(data); // nên return từ axios
      if (response?.status === STATUS_CODE_CREATE) {
        notificationFunction(
          "success",
          "Registration successful, please check your email to verify your account!",
          "Success",
          30
        );
        navigate("/login");
      } else {
        // fallback nếu server trả status lạ mà không throw lỗi
        notificationFunction(
          "error",
          "Unexpected response from server.",
          "Register failed",
          30
        );
      }

      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Registration failed!";
      notificationFunction("error", message, "Register failed");
    }
  };
};
