import apiClient from "../base/apiClient";
import BaseApi from "../base/BaseApi";

export class CompanyApi extends BaseApi {
  fetchListPost = () => {
    return apiClient.get(`api/company/getAllCompany`);
  };
  fetchPostById = (id) => {
    return apiClient.get(`api/company/${id}`);
  };
}

export const companyApi = new CompanyApi();
