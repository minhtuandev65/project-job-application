// src/Pages/ResetPassword/ResetYourPassword.jsx
import React from "react";
import { Input, Typography } from "antd";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import { useDispatch } from "react-redux";
import { resetPasswordAction } from "../../redux/actions/AuthAction/AuthAction";
const ResetYourPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");

  const formik = useFormik({
    initialValues: { password: "" },
    validate: (v) => {
      const e = {};
      if (!v.password) e.password = "Please enter new password!";
      else if (v.password.length < 6)
        e.password = "Password must be at least 6 characters!";
      return e;
    },
    onSubmit: async (values) => {
      try {
        const result = await dispatch(
          resetPasswordAction(values.password, token)
        );
        if (result?.payload?.success) {
          navigate("/login");
        }
      } catch (error) {
        // đã xử lý lỗi ở action
      }
    },
  });

  return (
    <div className="bg-page main">
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="form-page"
      >
        <Typography.Title
          level={3}
          className="custom-title"
        >
          Reset your password
        </Typography.Title>

        {/* Password */}
        <div className="mb-6">
          <Input.Password
            name="password"
            placeholder="Enter new password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
            className="custom-input"
          />
          {formik.touched.password && formik.errors.password && (
            <Typography.Text type="danger">
              {formik.errors.password}
            </Typography.Text>
          )}
        </div>

        {/* Submit */}
        <ButtonCustom
          htmlType="submit"
          type="text"
          text="Reset your password"
          block
        />
      </form>
    </div>
  );
};

export default ResetYourPassword;
