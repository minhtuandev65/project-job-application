import React from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  emailRegex,
  regexPattern,
} from "../../../../../utils/Validators/regex";
import ButtonCustom from "../../../../../components/ButtonCustom/ButtonCustom";

const { Option } = Select;

function CompanyInfoFields({ form, setLogoFile, setIsMapOpen }) {
  const category = Form.useWatch("category", form); // để hiện customCategory

  return (
    <>
      <Form.Item
        name="companyName"
        label="Company Name"
        validateTrigger="onFocus"
        rules={[
          { required: true, message: "Company Name is required !" },
          {
            pattern: regexPattern,
            message: "Only enter letters or numbers, 3 to 100 characters long",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="title"
        label="Title"
        validateTrigger="onFocus"
        rules={[
          { required: true, message: "Title is required !" },
          {
            pattern: regexPattern,
            message: "Only enter letters or numbers, 3 to 100 characters long",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lat"
        label="Latitude"
        validateTrigger="onFocus"
        rules={[{ required: true, message: "Latitude is required !" }]}
      >
        <Input readOnly />
      </Form.Item>

      <Form.Item
        name="lng"
        label="Longitude"
        validateTrigger="onFocus"
        rules={[{ required: true, message: "Longitude is required !" }]}
      >
        <Input readOnly />
      </Form.Item>

      <ButtonCustom
        type="link"
        text="📍 Select coordinates"
        className="max-w-40 !h-10 !text-xs !text-white mb-5"
        onClick={() => setIsMapOpen(true)}
      />

      <Form.Item
        name="phone"
        label="Phone"
        validateTrigger="onFocus"
        rules={[
          { required: true, message: "Phone is required !" },
          {
            pattern: /^(0|\+84)[0-9]{9}$/,
            message: "Phone number must be 10 digits, starting with 0",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        validateTrigger="onFocus"
        rules={[
          { required: true, message: "Email is required !" },
          {
            pattern: emailRegex,
            message:
              "Invalid email format, please enter something like user@example.com",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        validateTrigger="onFocus"
        rules={[{ required: true, message: "Category is required !" }]}
      >
        <Select placeholder="Select a category">
          <Option value="STORE">STORE</Option>
          <Option value="RESTAURANT">RESTAURANT</Option>
          <Option value="TECHNOLOGY">TECHNOLOGY</Option>
          <Option value="HOTEL">HOTEL</Option>
          <Option value="OTHER">OTHER</Option>
        </Select>
      </Form.Item>

      {category === "OTHER" && (
        <Form.Item
          name="customCategory"
          label="Custom Category"
          validateTrigger="onFocus"
          rules={[{ required: true, message: "Please enter custom category" }]}
        >
          <Input placeholder="Enter your category" />
        </Form.Item>
      )}

      <Form.Item
        name="description"
        label="Description"
        validateTrigger="onFocus"
        rules={[{ required: true, message: "Description is required !" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Logo">
        <Upload
          beforeUpload={(file) => {
            setLogoFile(file);
            return false;
          }}
          maxCount={1}
          showUploadList={{ showRemoveIcon: true }}
        >
          <Button icon={<UploadOutlined />}>Upload Logo</Button>
        </Upload>
      </Form.Item>
    </>
  );
}

export default CompanyInfoFields;
