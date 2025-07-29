let apiRoot = "";

if (import.meta.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:1303/v1";
}

if (import.meta.env.BUILD_MODE === "production") {
  apiRoot = "https://project-daily-sleep-tracker-be.onrender.com/v1";
}

export const DOMAIN = apiRoot;
