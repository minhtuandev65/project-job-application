import { clientsApi } from "@/api";
import { notificationFunction } from "@/libs";
import { SET_FETCH_MY_PROFILE } from "@/types";
import { displayLoadingAction, hideLoadingAction } from "../../loadingActions/loadingActions";

// Lấy thông tin người dùng
export const fetchMyProfileAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await clientsApi.fetchMyProfile();
      dispatch({
        type: SET_FETCH_MY_PROFILE,
        payload: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Get data failed!";
      notificationFunction("error", message, "Get data failed!");
    }
  };
};
