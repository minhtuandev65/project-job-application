import { notification } from "antd";

export const notificationFunction = (
  type,
  description = "",
  message,
  duration = 3
) => {
  return notification[type]({
    message: message,
    description: description,
    duration,
  });
};
