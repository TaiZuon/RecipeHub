import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token từ localStorage để xác định trạng thái đăng nhập
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // true nếu token tồn tại
  }, []);

  const toggleLogin = () => {
    if (isLoggedIn) {
      // Xử lý đăng xuất
      localStorage.removeItem("token");
    }
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", fontSize: "20px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            RecipeHub
          </Link>
        </div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="add-recipe">
            <Link to="/add-recipe">Add Recipe</Link>
          </Menu.Item>
          <Menu.Item key="add-ingredient">
            <Link to="/add-ingredient">Add Ingredient</Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="login-logout" onClick={toggleLogin}>
            <Link to="/login">{isLoggedIn ? "Log out" : "Log in"}</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default AppHeader;
