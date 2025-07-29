import React, { useState } from "react";
import { Layout, Avatar, Typography, Dropdown, Input, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "@/assets/img/logo/main-logo.png";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { avatarMenuItems, menuManageItems } from "@/helpers";
import { handleSearch } from "@/utils";

function Header({ userProfile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setSearchKeyword] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <Layout.Header className="bg-header-footer-color mainHeader">
      <Link to="/home" className="linkLogo">
        <img src={logo} alt="Logo" className="logoResponsive" />
      </Link>

      {/* Desktop Search */}
      <div className="desktop-search">
        <Input
          prefix={<SearchOutlined style={{ color: "#8C8C8C" }} />}
          value={keyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onPressEnter={() => handleSearch(dispatch, navigate, keyword)}
          placeholder="What are you looking for today?"
          style={{
            flex: 1,
            borderRadius: "20px 0 0 20px",
            color: "#595959",
            height: 40,
          }}
        />
        <Button
          onClick={() => handleSearch(dispatch, navigate, keyword)}
          className="custom-btn-search"
        >
          Search
        </Button>
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
              onPressEnter={() => handleSearch(dispatch, navigate, keyword)}
              style={{ width: "80%", marginBottom: 10, borderEndEndRadius: 0 }}
            />
            <Button
              type="primary"
              block
              onClick={() => handleSearch(dispatch, navigate, keyword)}
              className="custom-btn-search"
            >
              Search
            </Button>
          </div>
        </div>
      )}

      {userProfile?.displayName ? (
        <div className="flex items-center gap-3 max-w-[500px] overflow-hidden">
          <div className="block md:hidden">
            <SearchOutlined onClick={() => setShowMobileSearch(true)} />
          </div>
          {userProfile?.role?.includes("ADMIN") && (
            <Dropdown menu={{ items: menuManageItems }} placement="bottom">
              <Button type="default" className="max-w-[80px]">
                Menu
              </Button>
            </Dropdown>
          )}
          <Typography.Text
            strong
            className="truncate text-white hidden md:inline max-w-[500px] "
          >
            Hi, {userProfile.displayName}
          </Typography.Text>
          <Dropdown
            menu={{
              items: avatarMenuItems({
                navigate,
                dispatch,
                role: userProfile?.role,
              }),
            }}
            placement="bottom"
          >
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
    </Layout.Header>
  );
}

export default Header;
