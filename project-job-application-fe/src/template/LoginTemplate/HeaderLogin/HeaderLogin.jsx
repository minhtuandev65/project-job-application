import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../../assets/Img/Logo/main-logo.png";

const { Header } = Layout;

function HeaderLogin() {
  return (
    <Layout>
      <Header className="bg-header-footer-color mainHeader">
        {/* Logo */}
        <Link to="/" className="linkLogo">
          <img src={logo} alt="logo" className="logoResponsive" />
        </Link>
      </Header>
    </Layout>
  );
}

export default HeaderLogin;
