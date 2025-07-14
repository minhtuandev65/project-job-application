import apiClient from "../BaseService/apiClient";
import BaseService from "../BaseService/BaseService";

export class CompanyServices extends BaseService {
  getListPost = () => {
    return apiClient.get(`api/company/getAllCompany`);
  };
  getPostById = (companyId) => {
    return apiClient.get(`api/company/${companyId}`);
  };
}

export const companyServices = new CompanyServices();
