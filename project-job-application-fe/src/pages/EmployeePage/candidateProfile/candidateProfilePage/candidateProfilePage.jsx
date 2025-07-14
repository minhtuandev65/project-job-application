import { Table, Space, Image, Tag, Typography, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ButtonCustom from "../../../../components/ButtonCustom/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidateProfileAction } from "../../../../redux/actions/Users/candidateProfileAction/candidateProfileAction";
const { Option } = Select;
function CandidateProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const { listCandidateProfile } = useSelector(
    (state) => state.candidateProfileReducer
  );

  useEffect(() => {
    dispatch(getAllCandidateProfileAction(status));
  }, [dispatch, status]);
  const columns = [
    {
      title: "Ordinal number",
      key: "index",
      render: (_t, _r, i) => i + 1,
    },
    {
      title: "Logo",
      key: "logoUrl",
      render: (_, record) => {
        return <Image src={record.company?.logoUrl} width={100} />;
      },
    },
    {
      title: "Company Name",
      key: "companyName",
      ellipsis: true,
      render: (_, record) => record.company?.companyName,
    },
    {
      title: "Contact Email",
      key: "email",
      ellipsis: true,
      render: (_, record) => record.company?.email,
    },
    {
      title: "Contact Phone",
      key: "phone",
      render: (_, record) => record.company?.phone,
    },
    {
      title: "Address Company",
      key: "address",
      ellipsis: true,
      render: (_, record) => record.company?.address,
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => record.company?.category,
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
              : "blue"
          }
        >
          {record.status}
        </Tag>
      ),
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
                navigate(`/home/candidatePrifile/${record._id}/detail`)
              }
            />
          </Space>
        );
      },
    },
  ];
  return (
    <div className="containerPage mt-20 mb-20">
      <Typography.Title level={3} className="text-center custom-title !mb-10">
        Candidate Profile Management
      </Typography.Title>
      <div className="mb-4 flex justify-end">
        <Select
          placeholder="Filter by status"
          value={status}
          style={{ width: 200 }}
          allowClear
          onChange={(value) => setStatus(value)}
        >
          <Option value="">All</Option>
          <Option value="accepted">Accepted</Option>
          <Option value="pending">Pending</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={listCandidateProfile}
        rowKey="_id"
        pagination={{ pageSize: 12 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default CandidateProfilePage;
