import React, { useState } from "react";
import { Col, Typography, Descriptions, Tag, Image, Skeleton } from "antd";
import { useOutletContext } from "react-router";
import { Link } from "react-router-dom";
import ModalUpdateProfile from "./ModalUpdateProfile/ModalUpdateProfile";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";

const { Title } = Typography;

function MyProfilePage() {
  const { userProfile } = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);

  const isLoading = !userProfile || Object.keys(userProfile).length === 0;

  return (
    <div className="containerPage mt-20 mb-20">
      <Skeleton loading={isLoading} active avatar paragraph={{ rows: 8 }}>
        {!isLoading && (
          <>
            <Col span={24} style={{ textAlign: "center", margin: "24px 0" }}>
              <Image
                src={userProfile?.avatar}
                width={120}
                height={120}
                alt="Avatar User"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </Col>

            <Col span={24}>
              <Title level={3} style={{ margin: "24px 0" }}>
                My Profile
              </Title>
              <div className="max-w-[200px]">
                <ButtonCustom
                  type="default"
                  text={"Update Profile"}
                  onClick={() => setIsOpen(true)}
                />
              </div>

              <ModalUpdateProfile
                open={isOpen}
                onClose={() => setIsOpen(false)}
              />

              <Descriptions
                bordered
                size="default"
                column={1}
                style={{  margin: "24px 0" }}
              >
                <Descriptions.Item label="email">
                  {userProfile?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Account Name">
                  {userProfile?.displayName}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  <Tag
                    color={
                      userProfile?.gender === "MALE"
                        ? "green"
                        : userProfile?.gender === "FEMALE"
                        ? "blue"
                        : "red"
                    }
                  >
                    {userProfile?.gender === "MALE"
                      ? "MALE"
                      : userProfile?.gender === "FEMALE"
                      ? "FEMALE"
                      : "OTHER"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                  {userProfile?.role.map((r) => (
                    <Tag key={r} color={r === "EMPLOYEE" ? "blue" : "red"}>
                      {r}
                    </Tag>
                  ))}
                </Descriptions.Item>
                <Descriptions.Item label="Skill">
                  {userProfile?.skillSets?.map((skill, index) => (
                    <div key={index} style={{ marginBottom: 4 }}>
                      <strong>{skill.name}:</strong>{" "}
                      <Tag color="blue">{skill.level || skill["leve;"]}</Tag>
                    </div>
                  )) || "No skills"}
                </Descriptions.Item>

                <Descriptions.Item label="Active">
                  <Tag color={userProfile?.isActive ? "green" : "red"}>
                    {userProfile?.isActive ? "True" : "False"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Creation date">
                  {userProfile?.createdAt &&
                    new Date(userProfile.createdAt).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="CV">
                  <Link to={userProfile?.cvUrl}>{userProfile?.cvUrl}</Link>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </>
        )}
      </Skeleton>
    </div>
  );
}

export default MyProfilePage;
