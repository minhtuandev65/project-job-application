import { searchApi } from "@/api";
import { STATUS_CODE_OK } from "@/config";
import { notificationFunction } from "@/libs";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "@/services/actions/loadingActions/loadingActions";
import { SET_FILTER_COMPANIES } from "@/types";

// bộ lọc
export const filterCompaniesAction = (filters) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await searchApi.filterCompanies(filters);

      if (result.status === STATUS_CODE_OK) {
        dispatch({
          type: SET_FILTER_COMPANIES,
          payload: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      const message = error?.response?.data?.message || "Filter failed!";
      notificationFunction("error", message, "Filter failed!");
    }
  };
};
