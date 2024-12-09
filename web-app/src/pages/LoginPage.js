import React, { useState } from "react";
import { Layout, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer } = Layout;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onFinish = async () => {
    try {
      // Gửi request đến API đăng nhập
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        // Lưu token vào localStorage và chuyển hướng đến trang chính
        localStorage.setItem("authToken", response.data.token);
        message.success("Đăng nhập thành công!");
        navigate("/dashboard"); // Chuyển đến trang dashboard sau khi đăng nhập thành công
      } else {
        message.error("Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Đã xảy ra lỗi khi đăng nhập!");
    }
  };

  return (
    <Layout>
      <Header style={{ color: "white", textAlign: "center" }}>
        <h1>Đăng nhập</h1>
      </Header>
      <Content style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Hãy nhập tên người dùng!" }]}
          >
            <Input
              placeholder="Tên người dùng"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </Form.Item>
        </Form>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default LoginPage;
