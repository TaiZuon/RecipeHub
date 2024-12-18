import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import AppHeader from "../components/AppHeader";
import axios from "axios";
import fileUtils from "../utils/fileUtils";
import { jwtDecode } from 'jwt-decode';
import { getIngredients } from "../service/ingredientService";


const { Content, Footer } = Layout;

const AddRecipePage = () => {
  const [fileList, setFileList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await getIngredients();
        setIngredients(response.data);
      } catch (error) {
        message.error("Không thể tải dữ liệu nguyên liệu!");
      }
    };

    fetchIngredients();
  }, []);

  const handleChange = ({ fileList }) => setFileList(fileList);

  const onFinish = async (values) => {
    const token = localStorage.getItem("authToken");

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;

    const imageUrls = [];

    // Loop through the selected files and upload them
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i].originFileObj;
      try {
        const imageUrl = await fileUtils.uploadImage(file, `recipes/${userId}`);
        
        imageUrls.push({ imageUrl, isPrimary: i === 0 }); // Set the first image as primary
        console.log("Uploaded image URL: ", imageUrl);
      } catch (error) {
        message.error("Đã xảy ra lỗi khi tải lên hình ảnh!");
        console.error("Error: ", error);
        return;
      }
    }

    // Construct the RecipeRequest object
    const recipeRequest = {
      title: values.title,
      description: values.description,
      createdBy: userId,
      status : "PENDING",
      imageUrls
    };

    try {
      const response = await axios.post("http://localhost:8082/api/recipes", recipeRequest);
      message.success("Công thức đã được thêm thành công!");
      console.log("Received values: ", response.data);
    } catch (error) {
      message.error("Đã xảy ra lỗi khi thêm công thức!");
      console.error("Error: ", error);
    }
  };
  const [form] = Form.useForm();
  // State để quản lý danh sách nguyên liệu đã chọn
const [selectedIngredients, setSelectedIngredients] = useState([]);

// Hàm thêm nguyên liệu vào danh sách
const handleAddIngredient = (ingredient) => {
  if (!selectedIngredients.includes(ingredient)) {
    setSelectedIngredients((prev) => [...prev, ingredient]); // Thêm nguyên liệu mới
  }
};

// Hàm xóa nguyên liệu khỏi danh sách
const handleRemoveIngredient = (ingredient) => {
  setSelectedIngredients((prev) => prev.filter((item) => item !== ingredient));
};

// Cập nhật giá trị vào Form
useEffect(() => {
  form.setFieldsValue({ ingredients: selectedIngredients.join(", ") });
}, [selectedIngredients]);

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>Thêm công thức</h1>
        <Form form={form} name="add-recipe" onFinish={onFinish}>
          <Form.Item
            name="title"
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
  label=""
  name="ingredients"
>
  <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
    {/* Khung chứa nguyên liệu đã chọn */}
    <div style={{ flex: 1 }}>
      <h4>Các nguyên liệu đã chọn:</h4>
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "5px",
          padding: "10px",
          minHeight: "80px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          backgroundColor: "#fafafa",
        }}
      >
        {selectedIngredients.length > 0 ? (
          selectedIngredients.map((ingredient, index) => (
            <Button
              key={index}
              type="dashed"
              onClick={() => handleRemoveIngredient(ingredient)}
              style={{
                borderColor: "#ff4d4f",
                color: "#ff4d4f",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {ingredient} ✕
            </Button>
          ))
        ) : (
          <span style={{ color: "#bfbfbf" }}>Chưa có nguyên liệu nào được chọn</span>
        )}
      </div>
    </div>

    {/* Danh sách các nguyên liệu để thêm */}
    <div style={{ flex: 1 }}>
      <h4>Thêm nguyên liệu:</h4>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          padding: "10px",
          border: "1px dashed #d9d9d9",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {ingredients.map((ingredient) => (
          <Button
            key={ingredient.id}
            type="primary"
            onClick={() => handleAddIngredient(ingredient.name)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {ingredient.name}
          </Button>
        ))}
      </div>
    </div>
  </div>
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