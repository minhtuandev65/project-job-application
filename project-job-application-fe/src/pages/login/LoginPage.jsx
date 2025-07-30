import { loginAction } from "@/services";
import { Button, Input, Typography } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const { Title } = Typography;
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(loginAction(values, navigate));
    },
  });
  const redirectToLinkedIn = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_LINKEDIN_OAUTH_URL;
    const scope = import.meta.env.VITE_LINKEDIN_SCOPE;
    const state = import.meta.env.VITE_LINKEDIN_STATE;

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${state}`;
    window.location.href = authUrl;
  };

  const { handleSubmit, values } = formik;

  return (
    <div className="bg-page main">
      <form onSubmit={handleSubmit} autoComplete="off" className="form-page">
        <Title level={3} className="custom-title">
          Login
        </Title>

        {/* Email */}
        <div className="mb-6">
          <Input
            name="email"
            placeholder="useremail@example.com"
            autoComplete="email"
            value={values.email}
            className="custom-input"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <Input.Password
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={values.password}
            className="custom-input"
          />
        </div>

        {/* Submit */}
        <Button className="custom-button" htmlType="submit" type="text" block>
          Login
        </Button>
        {/* Đăng nhập linkedin */}
        <Button
          type="primary"
          block
          aria-label="Login with LinkedIn"
          icon={
            <img
              src="/linkedin-icon.png"
              alt="linkedin"
              style={{ width: 20, marginRight: 8 }}
            />
          }
          onClick={redirectToLinkedIn}
        />

        {/* Links */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link
            to="/register"
            className="#1890ff "
            style={{
              marginRight: 8,
              textDecoration: "none",
              color: "#1890ff",
              fontWeight: 500,
            }}
          >
            Resgister
          </Link>

          <Link
            to="/account/forgotPassword"
            style={{
              textDecoration: "none",
              color: "#6e6060",
              fontWeight: 500,
            }}
          >
            Forgot password
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
