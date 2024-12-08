import React from "react";
import { Layout, Card, List } from "antd";
import AppHeader from "../components/AppHeader";
const { Content, Footer } = Layout;

const recipe = {
  name: "Phở bò",
  description: "Công thức nấu phở bò chuẩn vị truyền thống.",
  ingredients: [
    "1kg xương bò",
    "500g thịt bò",
    "2 củ hành tây",
    "5 củ gừng",
    "Gia vị (muối, đường, nước mắm)...",
  ],
  steps: [
    "Sơ chế xương và thịt bò.",
    "Nấu nước dùng từ xương bò.",
    "Chế biến các loại gia vị và thêm vào nước dùng.",
    "Thưởng thức món ăn kèm bánh phở và rau sống.",
  ],
};

const RecipeDetails = () => {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <Card title={recipe.name}>
          <p>
            <strong>Mô tả:</strong> {recipe.description}
          </p>
          <p>
            <strong>Nguyên liệu:</strong>
          </p>
          <List
            dataSource={recipe.ingredients}
            renderItem={(item) => <List.Item>- {item}</List.Item>}
          />
          <p>
            <strong>Các bước thực hiện:</strong>
          </p>
          <List
            dataSource={recipe.steps}
            renderItem={(item) => <List.Item>- {item}</List.Item>}
          />
        </Card>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default RecipeDetails;
