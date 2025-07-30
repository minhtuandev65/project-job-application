import {
  handleAcceptedCandidateProfileAdmin,
  handleRejectedCandidateProfileAdmin,
} from "@/utils";
import { Button, Space, Tag } from "antd";

export const menuColumnsCandidateProfileAdmin = (dispatch, navigate) => {
  return [
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
            <Button
              type="primary"
              size="small"
              onClick={() =>
                handleAcceptedCandidateProfileAdmin(dispatch, record._id)
              }
              disabled={!isPending}
            >
              Accept
            </Button>
            <Button
              danger={true}
              type="primary"
              size="small"
              onClick={() =>
                handleRejectedCandidateProfileAdmin(dispatch, record._id)
              }
              disabled={!isPending}
            >
              Reject
            </Button>
            <Button
              size="small"
              type="default"
              onClick={() =>
                navigate(`/admin/manageCandidateProfile/${record._id}/detail`)
              }
            >
              View
            </Button>
          </Space>
        );
      },
    },
  ];
};
