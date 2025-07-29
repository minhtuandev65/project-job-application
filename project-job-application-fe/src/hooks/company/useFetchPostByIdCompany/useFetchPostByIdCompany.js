import { fetchPostByIdAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchPostByIdCompany = (id) => {
  const dispatch = useDispatch();
  const { detailsPost } = useSelector((state) => state.companyReducer);

  useEffect(() => {
    dispatch(fetchPostByIdAction(id));
  }, [dispatch, id]);

  return { detailsPost };
};
