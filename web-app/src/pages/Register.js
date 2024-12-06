import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "../axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/register", { email, password });
      message.success("Registration successful");
    } catch (error) {
      message.error("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
