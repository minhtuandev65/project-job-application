import apiClient from "@/api/base/apiClient";
import BaseApi from "@/api/base/BaseApi";


export class SearchApi extends BaseApi {
  searchElastic = (keyword) => {
    return apiClient.get(`api/company/search?keyword=${keyword}`);
  };
  filterCompanies = (filters) => {
    return apiClient.get(`api/company/filter`, { params: filters });
  };
}

export const searchApi = new SearchApi();
