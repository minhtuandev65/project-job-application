import { fetchAllCandidateProfileAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchAllCandidateProfileAdmin = () => {
  const dispatch = useDispatch();
  const { candidateProfileList } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    dispatch(fetchAllCandidateProfileAction());
  }, [dispatch]);
  return { candidateProfileList };
};
