import React, { useState, useEffect, useRef } from "react";
import { Layout, Input, Row, Col, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import axios from "axios";

const { Content, Footer } = Layout;
const { Search } = Input;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ page: 1, size: 2, categoryType: [] });
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const lastPostElementRef = useRef();

  const navigate = useNavigate();

  const fetchRecipes = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8082/api/recipes/search", {
        params: searchParams
      });
      const data = response.data.data;
      console.log("data:", data);
      const recipesArray = Array.isArray(data) ? data : [];
      setRecipes(recipesArray);  
      console.log("typeof data:", typeof data);
      console.log("recipes:", recipesArray);
    } catch (error) {
      message.error("Không thể tải dữ liệu công thức!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(page);
  }, [searchParams]);

  const onSearch = (value) => {
    setSearchParams({ ...searchParams, categoryType: value ? [value] : [] });
  };

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px" }}>
        <Search
          placeholder="Tìm kiếm công thức..."
          onSearch={onSearch}
          enterButton
          style={{ marginBottom: "20px" }}
        />
        <Row gutter={[16, 16]}>
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            recipes.map((recipe, index) => (
              <Col span={8} key={recipe.recipeId}>
                <Card
                  title={recipe.title}
                  extra={<Link to={`/recipe/${recipe.recipeId}`}>Xem chi tiết</Link>}
                  cover={<img alt={recipe.title} src={recipe.recipeImages[0]?.imageUrl} />}
                >
                  {recipe.description}
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default HomePage;