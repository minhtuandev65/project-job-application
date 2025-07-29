import { notificationFunction } from "@/libs";

export const handleNavigateAndNotifycation = (
  navigate,
  path = "",
  value,
  message
) => {
  navigate(path);
  notificationFunction("success", `Hello ${value}`, `Successfully ${message}`);
};
