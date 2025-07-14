import apiClient from "../../BaseService/apiClient";
import BaseService from "../../BaseService/BaseService";

export class CandidateProfileServices extends BaseService {
  //   tạo mới hồ sơ ứng tuyển
  createNewCandidateProfile = (candidateProfileData) => {
    return apiClient.post(
      `api/candidateProfile/craeteNew`,
      candidateProfileData
    );
  };
  //   Lấy chi tiết hồ sơ ứng tuyển
  getDetailsCandidateProfile = (candidateProfileId) => {
    return apiClient.get(
      `api/candidateProfile/${candidateProfileId}/historyCandidateProfile`
    );
  };
  // lấy tất cả danh sách hồ sơ ứng tuyển của mình
  getAllCandidateProfile = (status) => {
    return apiClient.get(`api/candidateProfile?status=${status}`);
  };
}
export const candidateProfileServices = new CandidateProfileServices();
