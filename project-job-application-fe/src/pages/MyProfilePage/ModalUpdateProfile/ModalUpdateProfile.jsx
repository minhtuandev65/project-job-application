import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, Select, Space } from "antd";
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  updateProfileAction,
  uploadCvAction,
} from "../../../redux/actions/Users/users/usersAction";

const { Option } = Select;

function ModalUpdateProfile({ open, onClose }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [avatarFile, setAvatarFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  const handleSubmit = (values) => {
    const formData = new FormData();

    if (values.displayName?.trim()) {
      formData.append("displayName", values.displayName.trim());
    }

    if (values.gender) {
      formData.append("gender", values.gender);
    }

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    // Xử lý skillSets dạng text → object
    if (Array.isArray(values.skillSets)) {
      const parsedSkillSets = values.skillSets
        .map((text) => {
          if (typeof text === "string" && text.includes(" - ")) {
            const [name, level] = text.split(" - ");
            return {
              name: name.trim(),
              level: level?.trim() || "",
            };
          }
          return {
            name: text?.trim?.() || "",
            level: "",
          };
        })
        .filter((item) => item.name); // ❗ Loại bỏ các item rỗng

      if (parsedSkillSets.length > 0) {
        formData.append("skillSets", JSON.stringify(parsedSkillSets));
      }
    }

    dispatch(updateProfileAction(formData));

    if (cvFile) {
      const cvForm = new FormData();
      cvForm.append("cv", cvFile);
      dispatch(uploadCvAction(cvForm));
    }

    onClose();
  };

  return (
    <Modal
      title="Update your profile"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Lưu"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="displayName" label="Account Name">
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Select>
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
            <Option value="OTHER">Other</Option>
          </Select>
        </Form.Item>

        <Form.List name="skillSets">
          {(fields, { add, remove }) => (
            <>
              <label>Skill Sets</label>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item {...restField} name={name}>
                    <Input placeholder="Ex: Giao tiếp - Tốt" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add your skill
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item label="Avatar">
          <Upload
            beforeUpload={(file) => {
              setAvatarFile(file);
              return false;
            }}
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="CV (PDF/DOCX)">
          <Upload
            beforeUpload={(file) => {
              setCvFile(file);
              return false;
            }}
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Upload CV</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalUpdateProfile;
