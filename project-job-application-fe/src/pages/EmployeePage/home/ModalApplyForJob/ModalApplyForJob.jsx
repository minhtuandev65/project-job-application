import React, { useState } from "react";
import {
  Modal,
  Select,
  Descriptions,
  Tag,
  Space,
  Typography,
  Skeleton,
} from "antd";
import ButtonCustom from "../../../../components/ButtonCustom/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import { createNewCandidateProfileAction } from "../../../../redux/actions/Users/candidateProfileAction/candidateProfileAction";
import { useNavigate } from "react-router";

const { Option } = Select;
const { Title } = Typography;

function ModalApplyForJob({ data }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const matchedPosition = (data?.positions || []).find(
    (pos) => pos.title === selectedTitle
  );

  const handleApply = () => {
    const candidateProfileData = {
      companyId: data._id,
      position: matchedPosition,
    };
    dispatch(createNewCandidateProfileAction(candidateProfileData));
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    if (user) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      navigate("/login");
    }
  };
  return (
    <>
      <ButtonCustom
        type="default"
        text="Apply for job"
        onClick={handleOpenModal}
      />

      <Modal
        title="Apply for Job"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        {!data || !data.positions ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <>
            <Title level={5}>Chọn vị trí muốn ứng tuyển</Title>
            <Select
              className="w-full mb-4"
              placeholder="Chọn vị trí"
              onChange={(value) => setSelectedTitle(value)}
            >
              {data.positions.map((pos, idx) => (
                <Option key={idx} value={pos.title}>
                  {pos.title}
                </Option>
              ))}
            </Select>

            {matchedPosition && (
              <Descriptions bordered column={1} className="mb-4">
                <Descriptions.Item label="Basuc Salary">
                  {matchedPosition.basicSalary.toLocaleString()} VND
                </Descriptions.Item>
                <Descriptions.Item label="Working Hours">
                  {matchedPosition.workingHours}
                </Descriptions.Item>
                <Descriptions.Item label="Working Type">
                  {matchedPosition.workingType}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                  {matchedPosition.description}
                </Descriptions.Item>
                <Descriptions.Item label="Skills">
                  <Space wrap>
                    {matchedPosition.skills.map((skill, idx) => (
                      <Tag key={idx} color="blue">
                        {skill.name} - {skill.level}
                      </Tag>
                    ))}
                  </Space>
                </Descriptions.Item>
              </Descriptions>
            )}

            <div className="flex justify-end">
              <div className="max-w-[150px]">
                <ButtonCustom
                  text="Apply"
                  type="primary"
                  className="w-full"
                  onClick={handleApply}
                  disabled={!matchedPosition}
                />
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default ModalApplyForJob;
