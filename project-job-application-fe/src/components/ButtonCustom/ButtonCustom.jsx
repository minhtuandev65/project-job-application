// components/ButtonCustom.jsx
import React from "react";
import { Button } from "antd";
import "./ButtonCustom.css";

const ButtonCustom = React.forwardRef(
  (
    {
      text,
      type = "primary",
      icon,
      onClick,
      danger = false,
      disabled = false,
      htmlType = "button",
      className = "",
      ...rest
    },
    ref
  ) => {
    const isPrimary = type === "primary" && !danger;
    return (
      <Button
        ref={ref} // 👈 forward ref tại đây
        type={type}
        icon={icon}
        danger={danger}
        disabled={disabled}
        onClick={onClick}
        className={`btnCustom ${isPrimary ? "btnPrimary" : ""} ${
          danger ? "btnDanger" : ""
        } ${className}`.trim()}
        htmlType={htmlType}
        {...rest}
      >
        {text}
      </Button>
    );
  }
);

export default ButtonCustom;
