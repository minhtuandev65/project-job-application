import React, { useState } from "react";
import { Layout, Avatar, Typography, Dropdown, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../../../assets/Img/Logo/main-logo.png";
import { logoutAction } from "../../../../redux/actions/AuthAction/AuthAction";
import ButtonCustom from "../../../../components/ButtonCustom/ButtonCustom";
import { searchElasticAction } from "../../../../redux/actions/Users/search/searchAction";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
const { Header } = Layout;

function HomeHeader({ userProfile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setSearchKeyword] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const handleLogout = async () => {
    await dispatch(logoutAction());
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <Link to="/admin/manageUser" className="w-80">
          Manage User
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/admin/manageCandidateProfile">Manage Candidate Profile</Link>
      ),
    },
    {
      key: "3",
      label: <Link to="/admin/manageCompany">Manage Company</Link>,
    },
  ];
  const avataMenuItems = [
    {
      key: "1",
      label: <Link to="/home/me">My Profile</Link>,
    },
    userProfile?.role?.includes("EMPLOYEE") && {
      key: "3",
      label: <Link to="/home/candidateProfile">Candidate Profile</Link>,
    },
    {
      key: "2",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  // Xử lý tìm kiếm
  const handleSearch = () => {
    if (keyword.trim()) {
      dispatch(searchElasticAction(keyword));
      navigate(`/home/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };
  const saveSearchHistory = (query) => {
    const existing = JSON.parse(localStorage.getItem("SEARCH_HISTORY") || "[]");
    const updated = [query, ...existing.filter((item) => item !== query)];
    localStorage.setItem(
      "SEARCH_HISTORY",
      JSON.stringify(updated.slice(0, 10))
    ); // chỉ giữ 10 kết quả gần nhất
  };
  return (
    <Header className="bg-header-footer-color mainHeader">
      <Link to="/home" className="linkLogo">
        <img src={logo} alt="Logo" className="logoResponsive" />
      </Link>

      {/* Desktop Search */}
      <div className="desktop-search">
        <Input
          prefix={<SearchOutlined style={{ color: "#8C8C8C" }} />}
          value={keyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onPressEnter={handleSearch}
          placeholder="What are you looking for today?"
          style={{
            flex: 1,
            borderRadius: "20px 0 0 20px",
            color: "#595959",
            height: 40,
          }}
        />
        <ButtonCustom
          onClick={handleSearch}
          text="Search"
          className="custom-btn-search"
        />
      </div>

      {/* Mobile Search Popup */}
      {showMobileSearch && (
        <div className="mobile-search-icon">
          <div className="popup-content">
            <CloseOutlined
              className="close-icon"
              onClick={() => setShowMobileSearch(false)}
            />
            <Input
              placeholder="What are you looking for today?"
              value={keyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: "80%", marginBottom: 10, borderEndEndRadius: 0 }}
            />
            <ButtonCustom
              type="primary"
              block
              text="Search"
              onClick={handleSearch}
              className="custom-btn-search"
            />
          </div>
        </div>
      )}

      {userProfile?.displayName ? (
        <div className="flex items-center gap-3 max-w-[500px] overflow-hidden">
          <div className="block md:hidden">
            <SearchOutlined onClick={() => setShowMobileSearch(true)} />
          </div>
          {userProfile?.role?.includes("ADMIN") && (
            <Dropdown menu={{ items: menuItems }} placement="bottom">
              <ButtonCustom
                type="default"
                text={"Menu"}
                className="max-w-[80px]"
              />
            </Dropdown>
          )}
          <Typography.Text
            strong
            className="truncate text-white hidden md:inline max-w-[500px] "
          >
            Hi, {userProfile.displayName}
          </Typography.Text>
          <Dropdown menu={{ items: avataMenuItems }} placement="bottom">
            <Avatar src={userProfile.avatar} className="ml-1 cursor-pointer" />
          </Dropdown>
        </div>
      ) : (
        <div className="flex gap-3">
          <div className="block md:hidden">
            <SearchOutlined onClick={() => setShowMobileSearch(true)} />
          </div>
          <Link to="/login" className="text-white font-semibold">
            <Typography.Text strong className="text-white">
              Login
            </Typography.Text>
          </Link>
        </div>
      )}
    </Header>
  );
}

export default HomeHeader;
