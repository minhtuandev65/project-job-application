import React from "react";
import { Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import { loginAction } from "../../redux/actions/AuthAction/AuthAction";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import { emailRegex, passwordRegex } from "../../utils/Validators/regex";


export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeWithTouch = (check) => {
    const { name, value } = check.target;
    formik.setFieldTouched(name, true);
    formik.setFieldValue(name, value);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    validateOnBlur: false,
    validate: (values) => {
      const errors = {};
      // Check error email
      if (!values.email) {
        errors.email = "Please enter email!";
      } else if (values.email.length < 5 || values.email.length > 70) {
        errors.email = "Email must be between 5 and 70 characters!";
      } else if (!emailRegex.test(values.email)) {
        errors.email =
          "Invalid email format, Please enter your email useremail@example.com!";
      }
      // Check error password
      if (!values.password) {
        errors.password = "Please enter password!";
      } else if (!passwordRegex.test(values.password)) {
        errors.password =
          "Password must be at least 8 characters, include 1 uppercase letter and 1 special character!";
      }
      return errors;
    },
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

  const { handleSubmit, values, errors, touched } = formik;

  return (
    <div className="bg-page main">
      <form onSubmit={handleSubmit} autoComplete="off" className="form-page">
        <Typography.Title level={3} className="custom-title">
          Login
        </Typography.Title>

        {/* Email */}
        <div className="mb-6">
          {touched.email && errors.email && (
            <Typography.Text type="danger">{errors.email}</Typography.Text>
          )}
          <Input
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={values.email}
            onChange={handleChangeWithTouch}
            status={touched.email && errors.email ? "error" : "success"}
            className="custom-input"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          {touched.password && errors.password && (
            <Typography.Text type="danger">{errors.password}</Typography.Text>
          )}
          <Input.Password
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChangeWithTouch}
            status={touched.password && errors.password ? "error" : ""}
            className="custom-input"
          />
        </div>

        {/* Submit */}
        <ButtonCustom htmlType="submit" type="text" text="Login" block />
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
