import React from "react";
import { Layout, Form, Input, Button, App } from "antd";
import AppHeader from "../components/AppHeader";

const { Content, Footer } = Layout;

const AddRecipePage = () => {
  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <Form name="add-recipe" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Hãy nhập tên công thức!" }]}
          >
            <Input placeholder="Tên công thức" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Hãy nhập mô tả!" }]}
          >
            <Input.TextArea placeholder="Mô tả công thức" rows={4} />
          </Form.Item>
          <Form.Item
            name="ingredients"
            rules={[{ required: true, message: "Hãy nhập nguyên liệu!" }]}
          >
            <Input.TextArea
              placeholder="Nguyên liệu (ngăn cách bằng dấu phẩy)"
              rows={4}
            />
          </Form.Item>
          <Form.Item
            name="steps"
            rules={[
              { required: true, message: "Hãy nhập các bước thực hiện!" },
            ]}
          >
            <Input.TextArea
              placeholder="Các bước thực hiện (ngăn cách bằng dấu chấm)"
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Thêm công thức
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default AddRecipePage;
