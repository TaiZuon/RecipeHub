import React, { useEffect, useState } from "react";
import { Layout, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const { Header, Content, Footer } = Layout;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    //delete token if exists
    localStorage.removeItem("authToken");
  }, []);

  const onFinish = async () => {
    try {
      console.log("Login data:", { username, password });
      // Gửi request đến API đăng nhập
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        }
      );

      console.log("Login response:", response);

      if (response.status === 200) {
        const token = response.data.token;
        console.log("Token: ", token);
        const status = jwtDecode(token).status;
        console.log("Status: ", status);
        if (status !== "ACTIVE") {
          message.error("Tài khoản của bạn đã bị khóa!");
          return;
        } else {
          // Lưu token vào localStorage và chuyển hướng đến trang chính
          localStorage.setItem("authToken", response.data.token);
          message.success("Đăng nhập thành công!");
          navigate("/");
        } // Chuyển đến trang dashboard sau khi đăng nhập thành công
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
        <div style={{ color: "white", fontSize: "20px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            RecipeHub
          </Link>
        </div>
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
