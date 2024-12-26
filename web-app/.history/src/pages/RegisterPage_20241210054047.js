import React, { useState } from "react";
import { Layout, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

const { Header, Content, Footer } = Layout;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { username, password, fullName, dob, city } = values;

    const formattedDob = moment(dob).format("YYYY-MM-DD");

    const requestData = {
      username,
      password,
      role: "USER",
      fullName,
      dob: formattedDob,
      city,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        requestData
      );

      message.success("Đăng ký thành công!");
      console.log("Response: ", response.data);
      navigate("/login");
    } catch (error) {
      // Chỉ render thông tin cụ thể từ đối tượng error
      const errorMessage =
        error.response?.data?.message || "Đăng ký không thành công!";
      message.error(errorMessage);
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header style={{ color: "white", textAlign: "center" }}>
        <h1>Register</h1>
      </Header>
      <Content style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
        <Form
          layout="vertical" // Label hiển thị trên các ô nhập
          onFinish={onFinish}
          style={{ maxWidth: "600px", margin: "0 auto" }}
          name="register"
        >
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[{ required: true, message: "Hãy nhập tên người dùng!" }]}
          >
            <Input placeholder="Ví dụ: nguyen.duong" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="" />
          </Form.Item>
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Hãy nhập họ tên!" }]}
          >
            <Input placeholder="Ví dụ: Nguyễn Thái Dương" />
          </Form.Item>
          <Form.Item
            label="Ngày tháng năm sinh"
            name="dob"
            rules={[
              { required: true, message: "Hãy nhập ngày tháng năm sinh!" },
            ]}
          >
            <Input type="date" placeholder="Ví dụ: 1998-08-21" />
          </Form.Item>
          <Form.Item
            label="Thành phố"
            name="city"
            rules={[{ required: true, message: "Hãy nhập thành phố!" }]}
          >
            <Input placeholder="Ví dụ: Hà Nội" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
          <Form.Item>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </Form.Item>
        </Form>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default RegisterPage;
