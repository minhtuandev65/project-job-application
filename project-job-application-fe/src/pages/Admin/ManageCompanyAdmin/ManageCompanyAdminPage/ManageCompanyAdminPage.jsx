import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router";
import { deletePostAction } from "../../../../redux/actions/Admin/AdminAction";
import { Table, Space } from "antd";
import ButtonCustom from "../../../../components/ButtonCustom/ButtonCustom";
import ModalCreateNewPost from "../ModalCreateAndUpdatePost/ModalCreatePost";

function ManagePostAdminPage() {
  const { listCompany } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeletePost = (postId) => {
    dispatch(deletePostAction(postId));
  };
  const columns = [
    {
      title: "Ordinal number",
      key: "index",
      render: (_t, _r, i) => i + 1,
    },
    {
      title: "Contact Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Company Name",
      key: "companyName",
      dataIndex: "companyName",
    },
    {
      title: "Address Company",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },

    {
      title: "Post creation date",
      key: "createdAt",
      render: (_, record) => {
        const date = new Date(record.createdAt);
        return date.toLocaleDateString();
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        return (
          <Space>
            <ButtonCustom
              danger={true}
              type="primary"
              text="Delete"
              size="small"
              onClick={() => handleDeletePost(record._id)}
            />
          </Space>
        );
      },
    },
    {
      title: "View detail",
      key: "detail",
      render: (_, record) => {
        return (
          <Space>
            <ButtonCustom
              text="View"
              size="small"
              type="default"
              onClick={() =>
                navigate(`/admin/manageCompany/${record._id}/detail`)
              }
            />
          </Space>
        );
      },
    },
  ];
  return (
    <div className="containerPage">
      <div className="flex items-center justify-between mb-10 mt-10">
        <h2 className="text-2xl font-semibold">Manage Post</h2>
        <div>
          <ButtonCustom
            type="default"
            text="Create new post"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <ModalCreateNewPost open={isOpen} onClose={() => setIsOpen(false)} />
      <Table
        columns={columns}
        dataSource={listCompany}
        rowKey="_id"
        pagination={{ pageSize: 12 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default ManagePostAdminPage;
