import { searchApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import { displayLoadingAction, hideLoadingAction } from "@/services/actions/loadingActions/loadingActions";
import { SET_SEARCH_ELASTIC } from "@/types";

// tìm kiếm nâng cao
export const searchElasticAction = (keyword) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await searchApi.searchElastic(keyword);
      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_SEARCH_ELASTIC,
          payload: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Search failed!";
      notificationFunction("error", message, "Search failed!");
    }
  };
};
