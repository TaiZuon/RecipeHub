import React, { useEffect, useState, useRef, useCallback } from "react";
import { Layout, Input, Row, Col, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { getRecipes } from "../service/recipeService";

const { Content, Footer } = Layout;
const { Search } = Input;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ page: 1, size: 6, categoryType: [] });
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const lastPostElementRef = useRef();

  const navigate = useNavigate();

  const fetchRecipes = async (page, categoryType = []) => {
    setLoading(true);
    try {
      const response = await getRecipes(page, 6, categoryType);
      const data = response.data.data;
      console.log("data:", data);
      const recipesArray = Array.isArray(data) ? data : [];
      setRecipes((prevRecipes) => [...prevRecipes, ...recipesArray]);
      setTotalPages(response.data.totalPages);
      setHasMore(data.length > 0);
      console.log("recipes:", recipesArray);
    } catch (error) {
      message.error("Không thể tải dữ liệu công thức!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(page, searchParams.categoryType);
  }, [searchParams, page]);

  const loadRecipes = async (page) => {
    console.log(`loading recipes for page ${page}`);
    setLoading(true);
    try {
      const response = await fetchRecipes(page, searchParams.categoryType);
      const data = response?.data?.data || [];
      console.log(data.length > 0);
      setTotalPages(response?.data?.totalPages || 0);
      setRecipes((prevRecipes) => [...prevRecipes, ...data]);
      setHasMore(data.length > 0);
      console.log("loaded recipes:", data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (value) => {
    setSearchParams({ ...searchParams, categoryType: value ? [value] : [] });
    // setPage(1); // Reset page to 1 when searching
    setRecipes([]); // Clear previous recipes
  };

  const lastPostElementCallback = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

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
            recipes.map((recipe, index) => {
              if (recipes.length === index + 1) {
                return (
                  <Col span={8} key={recipe.recipeId} ref={lastPostElementCallback}>
                    <Card
                      title={recipe.title}
                      extra={<Link to={`/recipe/${recipe.recipeId}`}>Xem chi tiết</Link>}
                      cover={<img alt={recipe.title} src={recipe.recipeImages[0]?.imageUrl} />}
                    >
                      {recipe.description}
                    </Card>
                  </Col>
                );
              } else {
                return (
                  <Col span={8} key={recipe.recipeId}>
                    <Card
                      title={recipe.title}
                      extra={<Link to={`/recipe/${recipe.recipeId}`}>Xem chi tiết</Link>}
                      cover={<img alt={recipe.title} src={recipe.recipeImages[0]?.imageUrl} />}
                    >
                      {recipe.description}
                    </Card>
                  </Col>
                );
              }
            })
          )}
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default HomePage;