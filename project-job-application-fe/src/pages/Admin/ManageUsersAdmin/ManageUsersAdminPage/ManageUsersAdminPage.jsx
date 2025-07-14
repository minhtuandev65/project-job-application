import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router";
import {
  activateUserAction,
  lockUserAction,
} from "../../../../redux/actions/Admin/AdminAction";
import { Space, Table, Tag } from "antd";
import ButtonCustom from "../../../../components/ButtonCustom/ButtonCustom";

function ManageUserPage() {
  const { userList } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBlockUser = (userId) => {
    dispatch(lockUserAction(userId));
  };
  const handleActiveUser = (userId) => {
    dispatch(activateUserAction(userId));
  };
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_t, _r, i) => i + 1,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <img
          src={avatar}
          alt="avatar"
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      title: "User Name",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (roles) => (
        <Space>
          {roles.map((role) => (
            <Tag key={role} color={role === "ADMIN" ? "red" : "yellow"}>
              {role === "ADMIN" ? "Admin" : "User"}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "True" : "False"}
        </Tag>
      ),
    },
    {
      title: "Account creation date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const date = new Date(createdAt);
        return date.toLocaleDateString();
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isAdmin = record?.role?.includes("ADMIN");
        const isActive = record.isActive === true;
        return (
          <div
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            <ButtonCustom
              type="primary"
              text={"Active"}
              size="small"
              disabled={isAdmin || isActive}
              onClick={() => {
                handleActiveUser(record._id);
              }}
            />
            <ButtonCustom
              danger
              type="primary"
              text={"Block"}
              size="small"
              disabled={isAdmin || !isActive}
              onClick={() => {
                handleBlockUser(record._id);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "View user details",
      key: "actions",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            width: 90,
          }}
        >
          <ButtonCustom
            text={"View"}
            type="default"
            size="small"
            onClick={() => navigate(`/admin/user/${record._id}/detail`)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="containerPage">
      <h2 style={{ fontSize: 24, marginBottom: 16, margin: 15 }}>
        Manage Users
      </h2>
      <Table
        columns={columns}
        dataSource={userList}
        rowKey="_id"
        pagination={{ pageSize: 12 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default ManageUserPage;
