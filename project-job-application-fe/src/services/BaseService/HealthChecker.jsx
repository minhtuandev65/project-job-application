import React, { useEffect } from "react";
import axios from "axios";

const HealthChecker = () => {
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_HEALTH_API);
        console.log("Health status:", res.data);
      } catch (err) {
        console.error("Health check failed:", err);
      }
    };

    checkHealth(); // chạy ngay khi mount
    const interval = setInterval(checkHealth, 14 * 60 * 1000); // mỗi 14 phút

    return () => clearInterval(interval); // clear khi unmount
  }, []);

  return null;
};

export default HealthChecker;
