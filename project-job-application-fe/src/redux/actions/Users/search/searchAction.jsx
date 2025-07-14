import { searchSerivices } from "../../../../services/users/search/searchServices";
import { notificationFunction } from "../../../../utils/libs/Notification";
import { STATUS_CODE_OK } from "../../../../Utils/Setting/Config";
import {
  SET_SEARCH_ELASTIC,
  SET_FILTER_COMPANIES,
} from "../../../type/Users/search/searchTypes";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../LoadingAction/LoadingAction";
// tìm kiếm nâng cao
export const searchElasticAction = (keyword) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await searchSerivices.searchElastic(keyword);
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
// bộ lọc
export const filterCompaniesAction = (filters) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await searchSerivices.filterCompanies(filters);
      console.log("result", filters);
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
