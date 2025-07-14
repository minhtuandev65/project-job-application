import apiClient from "../../BaseService/apiClient";
import BaseService from "../../BaseService/BaseService";

export class SearchServices extends BaseService {
  searchElastic = (keyword) => {
    return apiClient.get(`api/company/search?keyword=${keyword}`);
  };
  filterCompanies = (filters) => {
    return apiClient.get(`api/company/filter`, { params: filters });
  };
}

export const searchSerivices = new SearchServices();
