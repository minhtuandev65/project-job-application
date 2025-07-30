import { acceptedCandidateProfileAdminAction } from "@/services";

export const handleAcceptedCandidateProfileAdmin = (dispatch, id) => {
  dispatch(acceptedCandidateProfileAdminAction(id));
};
