import React, { useEffect, useState } from "react";
import { Layout, Card, Button } from "antd";
import AppHeader from "../components/AppHeader";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "../service/userService";

const { Content, Footer } = Layout;


const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      

      const decodedToken = jwtDecode(token);
      const profileId = decodedToken.sub;

      try {
        const response = await getProfile(profileId);
        setProfile(response.data);
      } catch (error) {
        message.error("Không thể tải dữ liệu hồ sơ!");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (!profile) {
    return <p>Không tìm thấy hồ sơ!</p>;
  }

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
