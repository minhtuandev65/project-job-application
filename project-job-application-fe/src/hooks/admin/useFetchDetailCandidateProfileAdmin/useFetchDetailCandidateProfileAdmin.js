import { fetchDetailCandidateProfileAction } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchDetailCandidateProfileAdmin = (id) => {
  const dispatch = useDispatch();
  const { candidateProfileDetail } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    dispatch(fetchDetailCandidateProfileAction(id));
  }, [dispatch, id]);

  return { candidateProfileDetail };
};
