import { fetchMyProfileAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchMyProfile = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(fetchMyProfileAction());
  }, [dispatch]);

  return { userProfile };
};
