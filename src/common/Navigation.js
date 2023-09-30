import { useState } from "react";
// import Header_bar from "../components/common/header_bar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BankTwoTone,
  CarFilled,
  LineChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Header_bar from "./Header_bar";

const Navigation = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function getItem(label, key, icon) {
    return {
      key,
      label,
      icon,
      onClick: () => {
        navigate(key);
      },
    };
  }

  const items = [
    getItem("Dashboard", '/dashboard', <BankTwoTone />),
    getItem("Details", "/details", <UserOutlined />),
    getItem("Customer", "/customer", <CarFilled />),
    getItem("Product", "/product", <LineChartOutlined />),
    getItem("Financial", "/sales", <LineChartOutlined />),
    getItem("Bill", "/bill", <LineChartOutlined />),

  ];

  return (
    <>
      <Header_bar />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={location.pathname}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Content>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            PhonePlanet System ©2023
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Navigation;