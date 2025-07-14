import apiClient from "../../BaseService/apiClient";
import BaseService from "../../BaseService/BaseService";

export class UsersServices extends BaseService {
  //  uploadCv
  uploadCv = (cv) => {
    return apiClient.post(`api/users/upload-cv`, cv);
  };
  //   lấy thông tin cá nhân
  getMyProfile = () => {
    return apiClient.get(`api/users/me`);
  };
  //   cập nhật thông tin
  updateProfile = (profileData) => {
    return apiClient.put(`api/users/update`, profileData);
  };
}

export const usersServices = new UsersServices();
