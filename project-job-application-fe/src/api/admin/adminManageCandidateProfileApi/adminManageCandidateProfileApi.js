import { apiClient, BaseApi } from "@/api";

export class AdminManageCandidateProfileApi extends BaseApi {
  // duyệt hồ sơ ứng tuyển
  acceptedCandidateProfile = (id) => {
    return apiClient.put(`api/admin/candidateProfile/${id}/accepted`);
  };
  //   từ chối hồ sơ ứng tuyển
  rejectedCandidateProfile = (id) => {
    return apiClient.put(`api/admin/candidateProfile/${id}/rejected`);
  };
  //   Lấy tất cả danh sách ứng tuyển
  fetchAllCandidateProfile = () => {
    return apiClient.get(`api/admin/candidateProfile`);
  };
  //   Lấy chi tiết hồ sơ ứng tuyển
  fetchDetailsCandidateProfile = (id) => {
    return apiClient.get(`api/admin/candidateProfile/${id}/details`);
  };
}

export const adminManageCandidateProfileApi = new AdminManageCandidateProfileApi();
