import apiClient from "@/api/base/apiClient";
import BaseApi from "@/api/base/BaseApi";

export class ClientsMangeCandidateProfile extends BaseApi {
  //   tạo mới hồ sơ ứng tuyển
  createNewCandidateProfile = (data) => {
    return apiClient.post(`api/candidateProfile/craeteNew`, data);
  };
  //   Lấy chi tiết hồ sơ ứng tuyển
  fetchDetailsCandidateProfile = (id) => {
    return apiClient.get(`api/candidateProfile/${id}/historyCandidateProfile`);
  };
  // lấy tất cả danh sách hồ sơ ứng tuyển của mình
  fetchAllCandidateProfile = (status) => {
    return apiClient.get(`api/candidateProfile?status=${status}`);
  };
}

export const clientsMangeCandidateProfile = new ClientsMangeCandidateProfile();
