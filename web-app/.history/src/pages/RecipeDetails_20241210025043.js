import React, { useEffect, useState } from "react";
import { Layout, Card, List, message } from "antd";
import { useParams } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { getRecipe } from "../service/recipeService";
import { getUserById } from "../service/userService";

const { Content, Footer } = Layout;



const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState(null);


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipe(id);
        setRecipe(response.data);
        // console.log(response.data);

        const creatorResponse = await getUserById(response.data.createdBy);
        // console.log(creatorResponse);
        setCreator(creatorResponse.data);
        
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
          <p><strong>Mô tả:</strong> {recipe.description}</p>
          <p><strong>Người tạo:</strong> {creator ? creator.username : "Đang tải..."}</p>
          <p><strong>Hình ảnh:</strong></p>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={recipe.recipeImages}
            renderItem={(item) => (
              <List.Item>
                <img src={item.imageUrl} alt={recipe.title} style={{ width: '100%' }} />
              </List.Item>
            )}
          />
        </Card>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default RecipeDetails;
