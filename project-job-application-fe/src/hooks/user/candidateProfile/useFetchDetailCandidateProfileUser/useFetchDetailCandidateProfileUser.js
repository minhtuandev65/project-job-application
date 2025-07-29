import { fetchAllCandidateProfileUserAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchDetailCandidateProfileUser = (id) => {
  const dispatch = useDispatch();
  const { detailCandidateProfile } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchAllCandidateProfileUserAction(id));
  }, [dispatch, id]);

  return { detailCandidateProfile };
};
