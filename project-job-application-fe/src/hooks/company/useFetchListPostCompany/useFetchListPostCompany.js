import { fetchListPostCompanyAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchListPostCompany = () => {
  const dispatch = useDispatch();
  const { listPost } = useSelector((state) => state.companyReducer);

  useEffect(() => {
    dispatch(fetchListPostCompanyAction());
  }, [dispatch]);

  return { listPost };
};
