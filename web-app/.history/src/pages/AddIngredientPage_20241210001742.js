import React, { useState } from "react";
import { Layout, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import AppHeader from "../components/AppHeader";
import axios from "axios";
import fileUtils from "../utils/fileUtils";
import { jwtDecode } from 'jwt-decode';

const { Content, Footer } = Layout;

const AddIngredientPage = () => {
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList }) => setFileList(fileList);

  const onFinish = async (values) => {
    const token = localStorage.getItem("authToken");
    console.log("Token: ", token);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const imageUrls = [];

    // Loop through the selected files and upload them
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i].originFileObj;
      try {
        const imageUrl = await fileUtils.uploadImage(file, `ingredients/${userId}`);
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
            <Upload
              multiple
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false}
            >
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