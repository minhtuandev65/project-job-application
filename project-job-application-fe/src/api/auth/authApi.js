import apiClient from "../base/apiClient";
import BaseApi from "../base/BaseApi";


export class AuthApi extends BaseApi {
  login = (data) => {
    return apiClient.post(`api/auth/login`, data);
  };
  signup = (data) => {
    return apiClient.post(`api/auth/register`, data);
  };
  logout = () => {
    return apiClient.post(`api/auth/logout`);
  };
  verifyEmail = (data) => {
    return apiClient.post(`api/auth/verifyEmail`, data);
  };
  forgotPassword = (email) => {
    return apiClient.post(`api/auth/forgotPassword`, { email });
  };
  resetPassword = (password, token) => {
    return apiClient.post(`api/auth/resetPassword?token=${token}`, {
      password,
    });
  };
}

export const authApi = new AuthApi();
