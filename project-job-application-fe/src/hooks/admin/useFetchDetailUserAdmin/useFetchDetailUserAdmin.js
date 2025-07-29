import { fetchDetailUserAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchDetailUserAdmin = (id) => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    dispatch(fetchDetailUserAction(id));
  }, [dispatch, id]);

  return { userDetail };
};
