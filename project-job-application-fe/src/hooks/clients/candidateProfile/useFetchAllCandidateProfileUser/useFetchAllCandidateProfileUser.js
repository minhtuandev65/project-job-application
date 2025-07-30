import { fetchAllCandidateProfileUserAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchAllCandidateProfileUser = () => {
  const dispatch = useDispatch();
  const { listCandidateProfile } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchAllCandidateProfileUserAction());
  }, [dispatch]);

  return { listCandidateProfile };
};
