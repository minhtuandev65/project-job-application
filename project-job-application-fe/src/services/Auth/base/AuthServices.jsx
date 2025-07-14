import apiClient from "../../BaseService/apiClient";
import BaseService from "../../BaseService/BaseService";

export class AuthServices extends BaseService {
  login = (loginData) => {
    return apiClient.post(`api/auth/login`, loginData);
  };
  register = (registerData) => {
    return apiClient.post(`api/auth/register`, registerData);
  };
  logout = () => {
    return apiClient.post(`api/auth/logout`);
  };
  verifyEmail = (verifyData) => {
    return apiClient.post(`api/auth/verifyEmail`, verifyData);
  };
  // quên mật khẩu
  forgotPassword = (email) => {
    return apiClient.post("api/auth/forgotPassword", { email });
  };
  // Đổi mật khẩu
  resetPassword = (password, token) => {
    return apiClient.post(`api/auth/resetPassword?token=${token}`, {
      password,
    });
  };
}
export const authServices = new AuthServices();
