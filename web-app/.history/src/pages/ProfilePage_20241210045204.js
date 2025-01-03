import React, { useEffect, useState } from "react";
import { Layout, Card, Button, message, Form } from "antd";
import AppHeader from "../components/AppHeader";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "../service/userService";

const { Content, Footer } = Layout;


const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      
      const decodedToken = jwtDecode(token);
      const profileId = decodedToken.sub;
      console.log(profileId);

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
  }, [form]);

  // if (loading) {
  //   return <p>Đang tải...</p>;
  // }

  // if (!profile) {
  //   return <p>Không tìm thấy hồ sơ!</p>;
  // }



  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <Card title="Hồ sơ của tôi">
          <p>
            <strong>Tên người dùng:</strong> {profile.fullName}
          </p>
          <p>
            <strong>Ngày sinh</strong> {profile.dob}
          </p>
          <p>
            <strong>Thành phố</strong> {profile.city}
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
