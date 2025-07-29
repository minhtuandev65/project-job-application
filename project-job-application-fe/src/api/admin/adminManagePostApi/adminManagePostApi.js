import { apiClient, BaseApi } from "@/api";

export class AdminManagePostApi extends BaseApi {
  //   tạo mới bài tuyển dụng
  createNewPost = (data) => {
    return apiClient.post(`api/admin/company/createNewPost`, data);
  };
  //   Xóa bài tuyển dụng
  deletePost = (id) => {
    return apiClient.delete(`api/admin/company/${id}/delete`);
  };
  //   cập nhật bài tuyển dụng
  updatePost = (id, data) => {
    return apiClient.put(`api/admin/company/${id}/update`, data);
  };
}

export const adminManagePostApi = new AdminManagePostApi();
