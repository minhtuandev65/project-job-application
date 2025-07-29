import { authApi } from "@/api";
import { notificationFunction } from "@/libs";
import { STATUS_CODE_OK } from "@/config";
import { RESET_ALL_STATE } from "@/types";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

// Tạo action để đăng xuất
export const logoutAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await authApi.logout();
      // Xóa thông tin người dùng khỏi localStorage
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: RESET_ALL_STATE,
          payload: result,
        });
        localStorage.removeItem("USER_LOGIN");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Logout failed!";
      notificationFunction("error", message, "Logout failed");
    }
  };
};
