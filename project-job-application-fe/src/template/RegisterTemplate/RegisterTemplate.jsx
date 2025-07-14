import React from "react";
import { Outlet } from "react-router-dom";
import RegisterHeader from "./RegisterHeader/RegisterHeader";
import FooterTemplate from "../Footer/Footer";
function RegisterTemplate() {
  return (
    <div className="mainTemplate">
      <RegisterHeader />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <FooterTemplate />
    </div>
  );
}

export default RegisterTemplate;
