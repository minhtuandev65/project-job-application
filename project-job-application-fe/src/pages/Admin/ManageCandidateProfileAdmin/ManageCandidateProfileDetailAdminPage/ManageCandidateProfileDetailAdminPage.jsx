import React, { useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Descriptions,
  Tag,
  Space,
  Image,
  Avatar,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetailsCandidateProfileAction } from "../../../../redux/actions/Admin/AdminAction";
import { Link } from "react-router-dom";

const { Title } = Typography;

function ManageCandidateProfileDetailAdminPage() {
  const { candidateProfileId } = useParams();
  const dispatch = useDispatch();
  const { candidateProfileDetail } = useSelector((state) => state.AdminReducer);

  useEffect(() => {
    if (candidateProfileId) {
      dispatch(getDetailsCandidateProfileAction(candidateProfileId));
    }
  }, [dispatch, candidateProfileId]);

  const detail = candidateProfileDetail || {};

  const { user, company, position, status } = detail;

  return (
    <div className="containerPage">
      <Col span={24} style={{ textAlign: "center", margin: "24px 0" }}>
        <Image
          src={company?.logoUrl}
          width={120}
          height={120}
          alt="Company Logo"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      </Col>

      <Col span={24}>
        <Title level={3} style={{ margin: "24px 0" }}>
          Company information
        </Title>
        <Descriptions
          bordered
          size="default"
          column={1}
          style={{ padding: 16, marginBottom: 24 }}
        >
          <Descriptions.Item label="Company name">
            {company?.companyName}
          </Descriptions.Item>
          <Descriptions.Item label="Title">{company?.title}</Descriptions.Item>
          <Descriptions.Item label="Category">
            {company?.category}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {company?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Contact Email">
            {company?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Contact phone">
            {company?.phone}
          </Descriptions.Item>
        </Descriptions>
      </Col>

      <Title level={3} style={{ marginBottom: 24 }}>
        Application profile details
      </Title>

      <Row gutter={32}>
        <Col span={12}>
          <Title level={4}>Candidate information</Title>
          <Descriptions bordered column={1} size="default" style={{ marginBottom: 40, padding: 16 }}>
            <Descriptions.Item label="Avatar">
              <div className="flex justify-center my-4">
                <Avatar
                  src={user?.avatar}
                  size={120}
                  style={{ objectFit: "cover" }}
                />
              </div>{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Display Name">
              {user?.displayName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="Role">
              {(user?.role || []).map((r) => (
                <Tag key={r} color={r === "EMPLOYEE" ? "blue" : "red"}>
                  {r}
                </Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Applying position">
              {position?.title}
            </Descriptions.Item>
            <Descriptions.Item label="Proposed salary">
              {position?.basicSalary.toLocaleString("vi-VN")} VND
            </Descriptions.Item>
            <Descriptions.Item label="Skill">
              {(position?.skill || []).map((s) => (
                <Tag key={s.name}>
                  {s.name} - {s.level}
                </Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={status === "ACCEPTED" ? "green" : "orange"}>
                {status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="CV">
              <Link to={`${user?.cvUrl}`}>{user?.cvUrl}</Link>
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={12}>
          <Title level={4}>Job Vacancies at the Company</Title>
          {company?.positions
            ?.filter((pos) => pos.title === position?.title)
            .map((pos, idx) => (
              <Descriptions
                key={idx}
                bordered
                size="default"
                column={1}
                style={{ marginBottom: 24, padding: 16 }}
              >
                <Descriptions.Item label="Title">{pos.title}</Descriptions.Item>
                <Descriptions.Item label="Quantity">
                  {pos.quantity}
                </Descriptions.Item>
                <Descriptions.Item label="Basic Salary">
                  {pos.basicSalary.toLocaleString()} VND
                </Descriptions.Item>
                <Descriptions.Item label="Working Type">
                  {pos.workingType}
                </Descriptions.Item>
                <Descriptions.Item label="Working Hours">
                  {pos.workingHours}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                  {pos.description}
                </Descriptions.Item>
                <Descriptions.Item label="Skills">
                  <Space wrap>
                    {pos.skills.map((skill, i) => (
                      <Tag key={i} color="blue">
                        {skill.name} - {skill.level}
                      </Tag>
                    ))}
                  </Space>
                </Descriptions.Item>
              </Descriptions>
            ))}
        </Col>
      </Row>
    </div>
  );
}

export default ManageCandidateProfileDetailAdminPage;
