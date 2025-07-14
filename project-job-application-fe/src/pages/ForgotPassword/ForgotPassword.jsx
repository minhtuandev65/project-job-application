import React from "react";
import { Input, Typography } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import { forgotPasswordAction } from "../../redux/actions/AuthAction/AuthAction";
import { emailRegex } from "../../utils/Validators/regex";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeWithTouch = (e) => {
    const { name, value } = e.target;
    formik.setFieldTouched(name, true); // Đánh dấu là đã chạm vào
    formik.setFieldValue(name, value); // Cập nhật giá trị
  };
  const formik = useFormik({
    initialValues: { email: "" },
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
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await dispatch(forgotPasswordAction(values.email, navigate));
      } catch {
        //  đã xử lý lỗi ở action
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
          Forgot password
        </Typography.Title>

        {/* Email */}
        <div className="mb-6">
          {formik.touched.email && formik.errors.email && (
            <Typography.Text type="danger" className="text-sm sm:text-xs">
              {formik.errors.email}
            </Typography.Text>
          )}
          <Input
            name="email"
            placeholder="useremail@example.com"
            value={formik.values.email}
            onChange={handleChangeWithTouch}
            status={formik.touched.email && formik.errors.email ? "error" : ""}
            className="custom-input"
          />
        </div>

        {/* Submit */}
        <ButtonCustom
          htmlType="submit"
          type="text"
          text="Send Recovery Email"
          block
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
