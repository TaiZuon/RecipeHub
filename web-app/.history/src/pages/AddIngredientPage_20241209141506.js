import React from "react";
import { Layout, Form, Input, Button, Menu, App } from "antd";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";

const { Content, Footer } = Layout;

const AddIngredientPage = () => {
  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>Thêm nguyên liệu</h1>
        <Form name="add-ingredient" onFinish={onFinish}>
          <Form.Item
            name="ingredientName"
            rules={[{ required: true, message: "Hãy nhập tên nguyên liệu!" }]}
          >
            <Input placeholder="Tên nguyên liệu" />
          </Form.Item>
          <Form.Item
            name="quantity"
            rules={[{ required: true, message: "Hãy nhập số lượng!" }]}
          >
            <Input placeholder="Số lượng" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Thêm nguyên liệu
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default AddIngredientPage;
