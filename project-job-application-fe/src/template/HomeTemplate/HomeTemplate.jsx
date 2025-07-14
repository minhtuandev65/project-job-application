// src/Templates/HomeTemplate/HomeTemplate.jsx
import React, { useEffect } from "react";
import HomeHeader from "./Layout/Header/HomeHeader";
import FooterTemplate from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCandidateProfileAciotn,
  getAllUserAction,
} from "../../redux/actions/Admin/AdminAction";
import { getMyProfileAction } from "../../redux/actions/AuthAction/AuthAction";
import { getListPostAction } from "../../redux/actions/CompanyActions/CompanyActions";

function HomeTemplate() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.AuthReducer);
  const { userList, candidateProfileList } = useSelector(
    (state) => state.AdminReducer
  );
  const { listCompany } = useSelector((state) => state.CompanyReducer);
  const { user } = useSelector((state) => state.AuthReducer);
  // fetch thông tin người dùng
  useEffect(() => {
    // gọi khi load lần đầu
    if (user) {
      dispatch(getMyProfileAction());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (Array.isArray(userProfile.role) && userProfile.role.includes("ADMIN")) {
      dispatch(getAllUserAction());
      dispatch(getAllCandidateProfileAciotn());
    }

    dispatch(getListPostAction());
  }, [dispatch, userProfile]);

  return (
    <div className="mainTemplate bg-page">
      <HomeHeader userProfile={userProfile} />
      <div style={{ flex: 1 }}>
        <Outlet
          context={{
            userList,
            candidateProfileList,
            userProfile,
            listCompany,
          }}
        />
      </div>
      <FooterTemplate />
    </div>
  );
}

export default HomeTemplate;
