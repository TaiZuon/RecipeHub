import React, { useEffect, useState } from "react";
import { Layout, Card, Button, message, Form, Input, Modal } from "antd";
import AppHeader from "../components/AppHeader";
import { jwtDecode } from "jwt-decode";
import { getProfile, updateProfile } from "../service/userService";

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

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (!profile) {
    return <p>Không tìm thấy hồ sơ!</p>;
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateProfile = async (values) => {
    const token = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(token);
    const profileId = decodedToken.sub;

    try {
      const response = await updateProfile(profileId, values);
      setProfile(response.data);
      message.success("Hồ sơ đã được cập nhật thành công!");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Không thể cập nhật hồ sơ!");
    }
  };
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
          <Button type="primary" style={{ marginTop: "10px" }}  onClick={showModal}>
            Chỉnh sửa hồ sơ
          </Button>
        </Card>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
      <Modal
        title="Chỉnh sửa hồ sơ"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdateProfile}>
          <Form.Item
            name="username"
            label="Tên người dùng"
            rules={[{ required: false, message: "Hãy nhập tên người dùng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="dob"
            rules={[{ required: false, message: "Hãy nhập email!" }]}
          >
            <Input type="date"/>
          </Form.Item>
          <Form.Item
            name="bio"
            label="Giới thiệu"
            rules={[{ required: false, message: "Hãy nhập giới thiệu!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProfilePage;
