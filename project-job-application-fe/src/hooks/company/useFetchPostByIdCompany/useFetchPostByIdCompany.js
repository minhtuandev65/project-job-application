import { fetchPostByIdCompanyAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchPostByIdCompany = (id) => {
  const dispatch = useDispatch();
  const { detailsPost } = useSelector((state) => state.companyReducer);

  useEffect(() => {
    dispatch(fetchPostByIdCompanyAction(id));
  }, [dispatch, id]);

  return { detailsPost };
};
