import apiClient from "./apiClient";

export class BaseApi {
  get = (url) => apiClient.get(url);
  post = (url, payload) => apiClient.post(url, payload);
  put = (url, payload) => apiClient.put(url, payload);
  delete = (url) => apiClient.delete(url);
}

export default BaseApi;
