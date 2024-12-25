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

      try {
        const response = await getProfile(profileId);
        setProfile(response.data);
        form.setFieldsValue({
          fullName: response.data.fullName,
          dob: response.data.dob, // Make sure the format is correct for input[type="date"]
          city: response.data.city,
        });
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
    form.setFieldsValue({
      fullName: profile.fullName,
      dob: profile.dob, // Ensure correct date format
      city: profile.city,
    });
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
      setProfile(response.data); // Cập nhật lại state profile
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
            <strong>Ngày sinh:</strong> {profile.dob}
          </p>
          <p>
            <strong>Thành phố:</strong> {profile.city}
          </p>
          <Button type="primary" style={{ marginTop: "10px" }} onClick={showModal}>
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
          <Form.Item name="fullName" label="Tên người dùng">
            <Input />
          </Form.Item>
          <Form.Item name="dob" label="Ngày tháng năm sinh">
            <Input type="date" />
          </Form.Item>
          <Form.Item name="city" label="Thành phố">
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