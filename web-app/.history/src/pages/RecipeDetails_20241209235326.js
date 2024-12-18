import React, { useEffect, useState } from "react";
import { Layout, Card, List } from "antd";
import AppHeader from "../components/AppHeader";
import { getRecipe } from "../service/recipeService";

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
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipe(id);
        setRecipe(response.data);
      } catch (error) {
        message.error("Không thể tải dữ liệu công thức!");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (!recipe) {
    return <p>Không tìm thấy công thức!</p>;
  }
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
