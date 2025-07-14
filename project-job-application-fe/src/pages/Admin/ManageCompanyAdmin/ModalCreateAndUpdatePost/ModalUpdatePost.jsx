import React, { useState } from "react";
import { Modal, Form } from "antd";
import { useDispatch } from "react-redux";
import { updatePostAction } from "../../../../redux/actions/Admin/AdminAction";
import PickLocationMap from "../../../../components/CompanyMap/PickLocationMap";
import CompanyInfoFields from "./CompanyInfoFields/CompanyInfoFields";
import PositionListFields from "./PositionListFields/PositionListFields";

function ModalUpdatePost({ open, onClose, postId }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [logoFile, setLogoFile] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleSubmit = (values) => {
    const formData = new FormData();

    // Gán giá trị chuỗi nếu tồn tại
    if (values.companyName?.trim())
      formData.append("companyName", values.companyName.trim());
    if (values.title?.trim()) formData.append("title", values.title.trim());
    if (values.address?.trim())
      formData.append("address", values.address.trim());
    if (values.phone?.trim()) formData.append("phone", values.phone.trim());
    if (values.email?.trim()) formData.append("email", values.email.trim());
    if (values.category) formData.append("category", values.category);
    if (values.description?.trim())
      formData.append("description", values.description.trim());

    // Vị trí địa lý
    if (values.lat) formData.append("lat", values.lat);
    if (values.lng) formData.append("lng", values.lng);

    // Upload logo nếu có
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    // Xử lý danh sách positions
    if (Array.isArray(values.positions)) {
      const formattedPositions = values.positions.map((pos) => ({
        ...pos,
        skills:
          pos.skills?.map((skillText) => {
            if (typeof skillText === "string" && skillText.includes(" - ")) {
              const [name, level] = skillText.split(" - ");
              return { name: name.trim(), level: level?.trim() || "" };
            }
            return { name: skillText?.trim?.() || "", level: "" };
          }) || [],
      }));
      formData.append("positions", JSON.stringify(formattedPositions));
    }

    dispatch(updatePostAction(postId, formData));
    onClose();
  };

  return (
    <Modal
      title="Create new post"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Post"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <CompanyInfoFields
          form={form}
          setLogoFile={setLogoFile}
          setIsMapOpen={setIsMapOpen}
        />
        <PositionListFields />
      </Form>
      <PickLocationMap
        visible={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onPick={({ lat, lng }) => {
          form.setFieldsValue({ lat, lng });
        }}
      />
    </Modal>
  );
}

export default ModalUpdatePost;
