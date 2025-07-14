import React from "react";
import { Layout, Typography } from "antd";
import logo from "../../assets/Img/Logo/main-logo.png";

const { Footer } = Layout;
const { Title } = Typography;

function FooterTemplate() {
  return (
    <Footer className="bg-header-footer-color shadow-top mt-auto w-full py-10 px-4 md:px-28">
      <div className="flex flex-col md:flex-row justify-between gap-10 text-black">
        {/* Phần bên trái */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={logo}
            alt="daily-sleep-tracker-logo"
            className="w-20 md:w-28 mb-3"
          />
          <Title
            level={5}
            className="!text-sm md:!text-base !font-bold !mb-0 !text-center md:!text-left"
          >
            Vietnam's leading sleep management and tracking system <br />
            Daily Sleep Tracker Co. Ltd. © 2016
          </Title>
        </div>

        {/* Phần bên phải */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <Title
            level={5}
            className="!text-sm md:!text-base !font-bold !mb-0 !text-center md:!text-left"
          >
            Company Daily Sleep Tracker
          </Title>
          <Title
            level={5}
            className="!text-xs md:!text-sm !font-normal mt-2 !leading-[1.8] !text-center md:!text-left"
          >
            Legal representative: Huỳnh Minh Tuấn
            <br />
            Address: Tầng 5, số 112 Cao Thắng, Phường 04, Quận 3, TP.HCM
            <br />
            Hotline: 1900.xxx - Email:
          </Title>
        </div>
      </div>
    </Footer>
  );
}

export default FooterTemplate;
