import apiClient from "../BaseService/apiClient";
import BaseService from "../BaseService/BaseService";

export class AdminServices extends BaseService {
  //   tạo mới bài tuyển dụng
  createNewPost = (formData) => {
    return apiClient.post(`api/admin/company/createNewPost`, formData);
  };
  //   Xóa bài tuyển dụng
  deletePost = (postId) => {
    return apiClient.delete(`api/admin/company/${postId}/delete`);
  };
  //   cập nhật bài tuyển dụng
  updatePost = (postId, formData) => {
    return apiClient.put(`api/admin/company/${postId}/update`, formData);
  };
  // duyệt hồ sơ ứng tuyển
  acceptedCandidateProfile = (candidateProfileId) => {
    return apiClient.put(
      `api/admin/candidateProfile/${candidateProfileId}/accepted`
    );
  };
  //   từ chối hồ sơ ứng tuyển
  rejectedCandidateProfile = (candidateProfileId) => {
    return apiClient.put(
      `api/admin/candidateProfile/${candidateProfileId}/rejected`
    );
  };
  //   chặn user
  lockUser = (userId) => {
    return apiClient.put(`api/admin/users/${userId}/lock`);
  };
  //   mở khóa
  activateUser = (userId) => {
    return apiClient.put(`api/admin/users/${userId}/activate`);
  };
  //   lấy tất cả danh sách user
  getAllUser = () => {
    return apiClient.get(`api/admin/users`);
  };
  //   Lấy chi tiết user
  getDetailUser = (userId) => {
    return apiClient.get(`api/admin/users/${userId}/details`);
  };
  //   Lấy tất cả danh sách ứng tuyển
  getAllCandidateProfile = () => {
    return apiClient.get(`api/admin/candidateProfile`);
  };
  //   Lấy chi tiết hồ sơ ứng tuyển
  getDetailsCandidateProfile = (candidateProfileId) => {
    return apiClient.get(
      `api/admin/candidateProfile/${candidateProfileId}/details`
    );
  };
}
export const adminServices = new AdminServices();
