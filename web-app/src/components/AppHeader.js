import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
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
        </Menu>
      </Header>
    </Layout>
  );
};

export default AppHeader;
