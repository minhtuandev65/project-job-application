import { apiClient, BaseApi } from "@/api";

export class AdminManageUserApi extends BaseApi {
  //   chặn user
  lockUser = (id) => {
    return apiClient.put(`api/admin/users/${id}/lock`);
  };
  //   mở khóa
  activateUser = (id) => {
    return apiClient.put(`api/admin/users/${id}/activate`);
  };
  //   lấy tất cả danh sách user
  fetchAllUser = () => {
    return apiClient.get(`api/admin/users`);
  };
  //   Lấy chi tiết user
  fetchDetailUser = (id) => {
    return apiClient.get(`api/admin/users/${id}/details`);
  };
}

export const adminManageUserApi = new AdminManageUserApi();
