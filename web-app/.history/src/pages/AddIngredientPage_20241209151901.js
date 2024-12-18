import React from "react";
import { Layout, Form, Input, Button, Menu, App, message } from "antd";
import AppHeader from "../components/AppHeader";
import axios from "axios";


const { Content, Footer } = Layout;

const AddIngredientPage = () => {
  const [accountInfo, setAccountInfo] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8081/api/ingredients", {
        name: values.ingredientName,
        imageUrls: [] // Add image URLs if needed
      });
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
          {/* <Form.Item
            name="imageUrl"
            rules={[{ required: true, message: "Hãy nhập URL hình ảnh!" }]}
          >
            <Input placeholder="URL hình ảnh" />
          </Form.Item> */}
          <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={image}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
              title="Edit avatar"
            >
              <CiEdit size={20} className="text-indigo-500" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(event) => handleFileChange(event, fetchAccountInfo)}
            />
          </div>
        </div>
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
