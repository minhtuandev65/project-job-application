import { fetchAllUserAdminAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchAllUserAdmin = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    dispatch(fetchAllUserAdminAction());
  }, [dispatch]);

  return { userList };
};
