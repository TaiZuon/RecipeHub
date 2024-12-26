import React from "react";
import { Layout, Card, Button } from "antd";
import AppHeader from "../components/AppHeader";


const { Content, Footer } = Layout;


const user = {
  username: "Nguyễn Thái Dương",
  email: "thai.duong@example.com",
  bio: "Yêu thích nấu ăn và chia sẻ công thức món ngon!",
};

const ProfilePage = () => {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <Card title="Hồ sơ của tôi">
          <p>
            <strong>Tên người dùng:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Giới thiệu:</strong> {user.bio}
          </p>
          <Button type="primary" style={{ marginTop: "10px" }}>
            Chỉnh sửa hồ sơ
          </Button>
        </Card>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default ProfilePage;
