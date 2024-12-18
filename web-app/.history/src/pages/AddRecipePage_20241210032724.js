import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AppHeader from "../components/AppHeader";
import axios from "axios";
import fileUtils from "../utils/fileUtils";
import { jwtDecode } from "jwt-decode";
import { getIngredients } from "../service/ingredientService";
import { createRecipeIngredient } from "../service/recipeService";

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
      status: "PENDING",
      imageUrls,
    };

    try {
      const response = await axios.post(
        "http://localhost:8082/api/recipes",
        recipeRequest
      );
        // Gọi API để tạo RecipeIngredient cho từng nguyên liệu đã chọn
      console.log(response)
      for (const ingredient of selectedIngredients) {
        const recipeIngredient = { ingredientId: ingredient.id, recipeId: recipeId };
        await createRecipeIngredient(recipeIngredient);
      }
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
  const handleAddIngredient = async (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prev) => [...prev, ingredient]); // Thêm nguyên liệu mới     
    }
  };

  // Hàm xóa nguyên liệu khỏi danh sách
  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.filter((item) => item !== ingredient)
    );
  };

  useEffect(() => {
    form.setFieldsValue({ ingredients: selectedIngredients });
  }, [selectedIngredients]);

  const isIngredientSelected = (ingredient) =>
    selectedIngredients.includes(ingredient);

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
            name="ingredients"
            rules={[{ required: true, message: "Hãy chọn nguyên liệu!" }]}
          >
            <div>
              <h3>Nguyên liệu đã chọn:</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedIngredients.map((ingredient) => (
                  <Button
                    key={ingredient}
                    onClick={() => handleRemoveIngredient(ingredient)}
                    type="primary"
                    danger
                  >
                    {ingredient} ✕
                  </Button>
                ))}
              </div>
            </div>
          </Form.Item>

          <div>
            <h3>Nguyên liệu:</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {ingredients.map((ingredient) => (
                <Button
                  key={ingredient.id}
                  onClick={() => handleAddIngredient(ingredient.name)}
                  style={{
                    visibility: selectedIngredients.includes(ingredient)
                      ? "hidden"
                      : "visible",
                  }}
                >
                  {ingredient.name}
                </Button>
              ))}
            </div>
          </div>

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
