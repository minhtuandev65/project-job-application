let apiRoot = "";

if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:1303/v1";
}

if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://project-daily-sleep-tracker-be.onrender.com/v1";
}

export const DOMAIN = apiRoot;
export const USER_LOGIN = "USER_LOGIN";
export const TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const STATUS_CODE_OK = 200;
export const STATUS_CODE_CREATE = 201;
