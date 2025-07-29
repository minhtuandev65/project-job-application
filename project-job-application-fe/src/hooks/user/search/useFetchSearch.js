import { searchElasticAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchSearch = (keyword) => {
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(searchElasticAction(keyword));
  }, [dispatch, keyword]);

  return { searchData };
};
