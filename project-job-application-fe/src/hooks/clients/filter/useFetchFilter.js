import { filterCompaniesAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchFilter = (filters) => {
  const dispatch = useDispatch();
  const { filterData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(filterCompaniesAction(filters));
  }, [dispatch, filters]);

  return { filterData };
};
