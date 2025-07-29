import { fetchListPostAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchListPostCompany = () => {
  const dispatch = useDispatch();
  const { listPost } = useSelector((state) => state.companyReducer);

  useEffect(() => {
    dispatch(fetchListPostAction());
  }, [dispatch]);

  return { listPost };
};
