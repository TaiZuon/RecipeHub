import React from "react";
import { Layout, Form, Input, Button, Upload, App, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import AppHeader from "../components/AppHeader";
import axios from "axios";


const { Content, Footer } = Layout;

const AddIngredientPage = () => {
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('file', values.image.file.originFileObj);
    try {
      
      const uploadResponse = await axios.post("http://localhost:8081/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const imageUrl = uploadResponse.data.url;

      // Construct the IngredientRequest object
      const ingredientRequest = {
        name: values.ingredientName,
        imageUrls: [{ imageUrl, isPrimary: true }]
      };
      message.success("Nguyên liệu đã được thêm thành công!");
      console.log("Received values: ", response.data);
    } catch (error) {
      message.error("Đã xảy ra lỗi khi thêm nguyên liệu!");
      console.error("Error: ", error);
    }
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
            name="imageUrl"
            rules={[{ required: true, message: "Hãy nhập URL hình ảnh!" }]}
          >
            <Input placeholder="URL hình ảnh" />
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
