import { rejectedCandidateProfileAdminAction } from "@/services";

export const handleRejectedCandidateProfileAdmin = (dispatch, id) => {
  dispatch(rejectedCandidateProfileAdminAction(id));
};
