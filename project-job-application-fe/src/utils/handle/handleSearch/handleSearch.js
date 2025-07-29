import { searchElasticAction } from "@/services";
import { saveSearchHistory } from "@/utils/saveSearchHistory/saveSearchHistory";

export const handleSearch = (dispatch, navigate, keyword) => {
  if (keyword.trim()) {
    dispatch(searchElasticAction(keyword));
    saveSearchHistory(keyword);
    navigate(`/home/search?keyword=${encodeURIComponent(keyword)}`);
  }
};
