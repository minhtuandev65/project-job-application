import React from "react";
import HeaderLogin from "./HeaderLogin/HeaderLogin";
import { Outlet } from "react-router-dom";
import FooterTemplate from "../Footer/Footer";
function LoginTemplate() {
  return (
    <div className="mainTemplate">
      <HeaderLogin />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <FooterTemplate />
    </div>
  );
}

export default LoginTemplate;
