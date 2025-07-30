import { DOMAIN } from "@/config/settings/settingApiRoot/settingApiRoot";
import axios from "axios";

const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

const apiClient = axios.create({
  baseURL: DOMAIN,
  withCredentials: true, // dùng cho cookie ở desktop
  headers: {
    Accept: "application/json",
    // KHÔNG để Authorization mặc định ở đây
  },
});

// 🛡️ Gắn Authorization chỉ khi là mobile
apiClient.interceptors.request.use((config) => {
  if (isMobile) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// ⚠️ Control refresh token logic chỉ cho mobile
let isRefreshing = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu access token hết hạn
    if (isMobile && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await apiClient.get("/api/users/refresh_token");
          const newToken = data.accessToken;
          localStorage.setItem("accessToken", newToken);

          // Gắn token mới vào request cũ rồi gửi lại
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          isRefreshing = false;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token hết hạn:", refreshError);
          isRefreshing = false;

          try {
            await apiClient.post("/api/users/logout");
          } catch (logoutErr) {
            console.warn("Logout lỗi:", logoutErr);
          }

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
