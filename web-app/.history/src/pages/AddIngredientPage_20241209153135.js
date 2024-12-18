import React from "react";
import { Layout, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import AppHeader from "../components/AppHeader";
import axios from "axios";

const { Content, Footer } = Layout;

const AddIngredientPage = () => {
  const onFinish = async (values) => {
    const formData = new FormData();
    const imageUrls = [];

    // Loop through the selected files and upload them
    for (let i = 0; i < values.images.fileList.length; i++) {
      formData.append('file', values.images.fileList[i].originFileObj);
      try {
        const imageUrl = await fileUtils.uploadImage(file, `avatars/${userId}`);
        const imageUrl = uploadResponse.data.url;
        imageUrls.push({ imageUrl, isPrimary: i === 0 }); // Set the first image as primary
      } catch (error) {
        message.error("Đã xảy ra lỗi khi tải lên hình ảnh!");
        console.error("Error: ", error);
        return;
      }
    }

    // Construct the IngredientRequest object
    const ingredientRequest = {
      name: values.ingredientName,
      imageUrls
    };

    try {
      const response = await axios.post("http://localhost:8081/api/ingredients", ingredientRequest);
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
            name="images"
            rules={[{ required: true, message: "Hãy chọn hình ảnh!" }]}
          >
            <Upload multiple beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
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