import { authApi } from "@/api";
import { notificationFunction } from "@/libs";
import { SET_LOGIN } from "@/types";
import { handleNavigateAndNotifycation } from "@/utils";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

// Tạo action để đăng nhập
export const loginAction = (credentials, navigate) => {
  return async (dispatch) => {
    const { email } = credentials;

    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    try {
      dispatch(displayLoadingAction);

      const { role, accessToken, refreshToken } = await authApi.login(
        credentials
      );
      const resolvedRole = Array.isArray(role) ? role[0] : role;

      if (isMobile) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        // Không lưu token trên desktop
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      dispatch({
        type: SET_LOGIN,
        payload: {
          role: resolvedRole,
          email,
        },
      });

      handleNavigateAndNotifycation(navigate, "/home", email, "login");

      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Login failed!";
      notificationFunction("error", message, "Login failed");
    }
  };
};
