import apiClient from "../base/apiClient";
import BaseApi from "../base/BaseApi";

export class ClientsApi extends BaseApi {
  //  uploadCv
  uploadCv = (cv) => {
    return apiClient.post(`api/users/upload-cv`, cv);
  };
  //   lấy thông tin cá nhân
  fetchMyProfile = () => {
    return apiClient.get(`api/users/me`);
  };
  //   cập nhật thông tin
  updateProfile = (data) => {
    return apiClient.put(`api/users/update`, data);
  };
}

export const clientsApi = new ClientsApi();
