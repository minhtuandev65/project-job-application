import { Col, Typography, Descriptions, Tag, Image, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  activateUserAction,
  getDetailUserAction,
  lockUserAction,
} from "../../../../redux/actions/Admin/AdminAction";
import { Link } from "react-router-dom";
import ButtonCustom from "../../../../components/ButtonCustom/ButtonCustom";
const { Title } = Typography;
function ManageUsersDetailAdminPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.AdminReducer);

  useEffect(() => {
    dispatch(getDetailUserAction(userId));
  }, [dispatch, userId]);

  const handleActiveUser = (userId) => {
    dispatch(activateUserAction(userId));
  };
  const handleBlockUser = (userId) => {
    dispatch(lockUserAction(userId));
  };
  const isAdmin = userDetail?.role?.includes("ADMIN");
  const isActive = userDetail?.isActive;
  console.log(userDetail);
  const isLoading = !userDetail || Object.keys(userDetail).length === 0;
  return (
    <div className="containerPage mt-20 mb-20">
      <Skeleton loading={isLoading} active avatar paragraph={{ rows: 8 }}>
        {!isLoading && (
          <>
            <Col span={24} style={{ textAlign: "center", margin: "24px 0" }}>
              <Image
                src={userDetail?.avatar}
                width={120}
                height={120}
                alt="Avatar User"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </Col>

            <Col span={24}>
              <Title level={3} style={{ margin: "24px 0" }}>
                User Profile
              </Title>
              <div className="flex gap-5 max-w-[200px]">
                <ButtonCustom
                  text="Active"
                  disabled={isAdmin || isActive}
                  onClick={() => {
                    handleActiveUser(userId);
                  }}
                />
                <ButtonCustom
                  danger={true}
                  disabled={isAdmin || !isActive}
                  text="Block"
                  onClick={() => {
                    handleBlockUser(userId);
                  }}
                />
              </div>
              <Descriptions
                bordered
                size="default"
                column={1}
                style={{ margin: "24px 0" }}
              >
                <Descriptions.Item label="email">
                  {userDetail?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Account Name">
                  {userDetail?.displayName}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  <Tag
                    color={
                      userDetail?.gender === "MALE"
                        ? "green"
                        : userDetail?.gender === "FEMALE"
                        ? "blue"
                        : "red"
                    }
                  >
                    {userDetail?.gender === "MALE"
                      ? "MALE"
                      : userDetail?.gender === "FEMALE"
                      ? "FEMALE"
                      : "OTHER"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                  {userDetail?.role.map((r) => (
                    <Tag key={r} color={r === "EMPLOYEE" ? "blue" : "red"}>
                      {r}
                    </Tag>
                  ))}
                </Descriptions.Item>
                <Descriptions.Item label="Skill">
                  {userDetail?.skillSets?.map((skill, index) => (
                    <div key={index} style={{ marginBottom: 4 }}>
                      <strong>{skill.name}:</strong>{" "}
                      <Tag color="blue">{skill.level || skill["leve;"]}</Tag>
                    </div>
                  )) || "No skills"}
                </Descriptions.Item>

                <Descriptions.Item label="Active">
                  <Tag color={userDetail?.isActive ? "green" : "red"}>
                    {userDetail?.isActive ? "True" : "False"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Creation date">
                  {userDetail?.createdAt &&
                    new Date(userDetail.createdAt).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="CV">
                  <Link to={userDetail?.cvUrl}>{userDetail?.cvUrl}</Link>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </>
        )}
      </Skeleton>
    </div>
  );
}

export default ManageUsersDetailAdminPage;
