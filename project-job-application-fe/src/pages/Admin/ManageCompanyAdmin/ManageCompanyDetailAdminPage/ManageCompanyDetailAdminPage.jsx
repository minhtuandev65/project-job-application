import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { getPostByIdAction } from "../../../../redux/actions/CompanyActions/CompanyActions";
import { Row, Col, Typography, Descriptions, Tag, Space, Image } from "antd";
import CompanyMap from "../../../../components/CompanyMap/CompanyMap";
import ButtonCustom from "../../../../components/ButtonCustom/ButtonCustom";
import ModalUpdatePost from "../ModalCreateAndUpdatePost/ModalUpdatePost";
import ModalApplyForJob from "../../../EmployeePage/home/ModalApplyForJob/ModalApplyForJob";

const { Title } = Typography;
function ManageCompanyDetailAdminPage() {
  const { companyId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { detailsCompany } = useSelector((state) => state.CompanyReducer);

  useEffect(() => {
    dispatch(getPostByIdAction(companyId));
  }, [dispatch, companyId]);

  return (
    <div className="containerPage">
      <Col span={24} style={{ textAlign: "center", margin: "24px 0" }}>
        <Image
          src={detailsCompany?.logoUrl}
          width={120}
          height={120}
          alt="Company Logo"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      </Col>

      <Title level={3}>Company profile</Title>
      {location.pathname.includes("/admin") && (
        <div className="max-w-[200px]">
          <ButtonCustom
            type="default"
            text="Update"
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}
      <ModalUpdatePost
        open={isOpen}
        onClose={() => setIsOpen(false)}
        postId={companyId}
      />
      <div className="max-w-[200px] mb-4">
        {detailsCompany && <ModalApplyForJob data={detailsCompany} />}
      </div>
      <Col span={24} className="mb-4 pt-16 pb-16">
        <Descriptions bordered size="default" column={1}>
          <Descriptions.Item label="Company name">
            {detailsCompany?.companyName}
          </Descriptions.Item>
          <Descriptions.Item label="Title">
            {detailsCompany?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            {detailsCompany?.category}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {detailsCompany?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Contact Email">
            {detailsCompany?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Contact phone">
            {detailsCompany?.phone}
          </Descriptions.Item>
        </Descriptions>
      </Col>

      <Col span={24}>
        <Title level={4}>Job Vacancies at the Company</Title>
        {detailsCompany?.positions?.map((pos, idx) => (
          <Descriptions
            key={idx}
            bordered
            size="default"
            column={1}
            className="pt-16 pb-16 mb-4"
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
      <div className="pt-16 pb-16">
        <CompanyMap data={detailsCompany} />
      </div>
    </div>
  );
}

export default ManageCompanyDetailAdminPage;
