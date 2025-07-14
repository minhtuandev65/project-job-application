import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router";
import {
  acceptedCandidateProfileAction,
  rejectedCandidateProfileAction,
} from "../../../../redux/actions/Admin/AdminAction";
import { Table, Space, Tag } from "antd";
import ButtonCustom from "../../../../components/ButtonCustom/ButtonCustom";

function ManageCandidateProfileAdminPage() {
  const { candidateProfileList } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleAcceptedCandidateProfile = (candidateProfileId) => {
    dispatch(acceptedCandidateProfileAction(candidateProfileId));
  };
  const handleRejectedCandidateProfile = (candidateProfileId) => {
    dispatch(rejectedCandidateProfileAction(candidateProfileId));
  };
  const columns = [
    {
      title: "Ordinal number",
      key: "index",
      render: (_t, _r, i) => i + 1,
    },
    {
      title: "Applicant email",
      key: "email",
      render: (_, record) => record.user?.email,
    },
    {
      title: "Application submission date",
      key: "createdAt",
      render: (_, record) => {
        const date = new Date(record.createdAt);
        return date.toLocaleDateString();
      },
    },
    {
      title: "Company Name",
      key: "companyName",
      render: (_, record) => record.company?.companyName,
    },
    {
      title: "Address Company",
      key: "Address",
      render: (_, record) => record.company?.address,
    },
    {
      title: "Position",
      key: "position",
      render: (_, record) => record.position?.title,
    },
    {
      title: "Basic Salary",
      key: "basicSalary",
      render: (_, record) => record.position?.basicSalary,
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag
          color={
            record.status === "ACCEPTED"
              ? "green"
              : record.status === "REJECTED"
              ? "red"
              : "gold"
          }
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isPending = record.status === "PENDING";

        return (
          <Space>
            <ButtonCustom
              type="primary"
              text="Accept"
              size="small"
              onClick={() => handleAcceptedCandidateProfile(record._id)}
              disabled={!isPending}
            />
            <ButtonCustom
              danger={true}
              type="primary"
              text="Reject"
              size="small"
              onClick={() => handleRejectedCandidateProfile(record._id)}
              disabled={!isPending}
            />
            <ButtonCustom
              text="View"
              size="small"
              type="default"
              onClick={() =>
                navigate(`/admin/manageCandidateProfile/${record._id}/detail`)
              }
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="containerPage">
      <h2 style={{ fontSize: 24, marginBottom: 16, margin: 15 }}>
        Manage Candidate Profile
      </h2>
      <Table
        columns={columns}
        dataSource={candidateProfileList}
        rowKey="_id"
        pagination={{ pageSize: 12 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default ManageCandidateProfileAdminPage;
