import React from "react";
import { Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import { registerAction } from "../../redux/actions/AuthAction/AuthAction";
import {
  containsNumberRegex,
  displayNameRegex,
  emailRegex,
  passwordRegex,
} from "../../utils/Validators/regex";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // hàm check lỗi tự động
  const handleChangeWithTouch = (check) => {
    const { name, value } = check.target;
    formik.setFieldTouched(name, true);
    formik.setFieldValue(name, value);
  };

  const formik = useFormik({
    initialValues: {
      displayName: "",
      password: "",
      email: "",
      role: "EMPLOYEE",
    },
    validateOnChange: true,
    validateOnBlur: false,
    validate: (values) => {
      const errors = {};

      // Check error tên hiển thị
      if (!values.displayName) {
        errors.displayName = "Please enter account name!";
      } else if (containsNumberRegex.test(values.displayName)) {
        errors.displayName = "Account name cannot contain numbers!";
      } else if (!displayNameRegex.test(values.displayName)) {
        errors.displayName =
          "Account name must be 4 ~ 50 characters, letters only, and include at least 2 letters!";
      }

      // Check error password
      if (!values.password) {
        errors.password = "Please enter password!";
      } else if (!passwordRegex.test(values.password)) {
        errors.password =
          "Password must be at least 8 characters, include 1 uppercase letter and 1 special character!";
      }
      // Check error email
      if (!values.email) {
        errors.email = "Please enter email!";
      } else if (values.email.length < 5 || values.email.length > 70) {
        errors.email = "Email must be between 5 and 70 characters!";
      } else if (!emailRegex.test(values.email)) {
        errors.email =
          "Invalid email format, Please enter your email useremail@example.com!";
      }
      if (!values.xacNhanMatKhau)
        errors.xacNhanMatKhau = "Please re-enter password!";
      else if (values.xacNhanMatKhau !== values.password)
        errors.xacNhanMatKhau = "Passwords do not match!";
      return errors;
    },
    onSubmit: async (values) => {
      const { xacNhanMatKhau, ...registerData } = values;
      try {
        await dispatch(registerAction(registerData, navigate));
      } catch (error) {
        // đã xử lý lỗi ở trong action
      }
    },
  });
  const { handleSubmit, values, errors, touched } = formik;
  return (
    <div className="bg-page main">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="form-page"
        noValidate
      >
        <Typography.Title
          level={3}
          className="custom-title"
        >
          Register a user account
        </Typography.Title>

        {/* displayName */}
        <div className="mb-6">
          {touched.displayName && errors.displayName && (
            <Typography.Text type="danger">
              {errors.displayName}
            </Typography.Text>
          )}
          <Input
            name="displayName"
            placeholder="Account name"
            autoComplete="displayName"
            value={values.displayName}
            onChange={handleChangeWithTouch}
            status={
              touched.displayName && errors.displayName ? "error" : "success"
            }
            className="custom-input"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          {touched.password && errors.password && (
            <Typography.Text type="danger">{errors.password}</Typography.Text>
          )}
          <Input.Password
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChangeWithTouch}
            status={touched.password && errors.password ? "error" : "success"}
            className="custom-input"
          />
        </div>

        {/* XÁC NHẬN MẬT KHẨU */}
        <div className="mb-6">
          {touched.xacNhanMatKhau && errors.xacNhanMatKhau && (
            <Typography.Text type="danger">
              {errors.xacNhanMatKhau}
            </Typography.Text>
          )}
          <Input.Password
            name="xacNhanMatKhau"
            placeholder="Confirm password"
            autoComplete="new-password"
            value={formik.values.xacNhanMatKhau}
            onChange={handleChangeWithTouch}
            status={
              touched.xacNhanMatKhau && errors.xacNhanMatKhau
                ? "error"
                : "success"
            }
            className="custom-input"
          />{" "}
        </div>

        {/* EMAIL */}
        <div className="mb-6">
          {touched.email && errors.email && (
            <Typography.Text type="danger">{errors.email}</Typography.Text>
          )}
          <Input
            name="email"
            placeholder="useremail@example.com"
            autoComplete="email"
            value={values.email}
            onChange={handleChangeWithTouch}
            status={touched.email && errors.email ? "error" : "success"}
            className="custom-input"
          />
        </div>

        {/* ĐĂNG KÝ */}
        <ButtonCustom htmlType="submit" type="text" text="Register" block />

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Typography.Text>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#1890ff",
                fontWeight: 500,
              }}
            >
              Login
            </Link>
          </Typography.Text>
        </div>
      </form>
    </div>
  );
}
