import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import logo from "../../../assets/Img/Logo/main-logo.png";
import ButtonCustom from "../../../components/ButtonCustom/ButtonCustom";

const { Header } = Layout;

function RegisterHeader() {
  return (
    <Layout className="h-auto">
      <Header
        className="bg-header-footer-color mainHeader !flex-none"
      >
        {/* Logo */}
        <Link to="/" className="linkLogo">
          <img
            src={logo}
            alt="logo"
            className="logoResponsive"
          />
        </Link>

        {/* Nút điều hướng */}
        <div className="flex items-center gap-4">
          <Link to="/login">
            <ButtonCustom
              htmlType="submit"
              type="text"
              text="Login"
              block
            />
          </Link>
        </div>
      </Header>
    </Layout>
  );
}

export default RegisterHeader;
