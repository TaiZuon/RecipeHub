import React, { useEffect, useState } from "react";
import { Layout, Card, Input, Row, Col, message } from "antd";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Content, Footer } = Layout;
const { Search } = Input;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ page: 1, size: 10, categoryType: [] });

  const navigate = useNavigate();

  const fetchRecipes = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8082/api/recipes/search", {
        params: searchParams
      });
      setRecipes(response.data);
    } catch (error) {
      message.error("Không thể tải dữ liệu công thức!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchParams]);

  const loadPosts = (page) => {
    console.log(`loading posts for page ${page}`);
    setLoading(true);
    getMyPosts(page)
      .then((response) => {
        setTotalPages(response.data.result.totalPages);
        setPosts((prevPosts) => [...prevPosts, ...response.data.result.data]);
        setHasMore(response.data.result.data.length > 0);
        console.log("loaded posts:", response.data.result);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logOut();
          navigate("/login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSearch = (value) => {
    // Xử lý logic tìm kiếm (có thể gọi API hoặc lọc danh sách hiện tại)
    console.log("Search value: ", value);
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
            recipes.map((recipe) => (
              <Col span={8} key={recipe.id}>
                <Card
                  title={recipe.name}
                  extra={<Link to={`/recipe/${recipe.id}`}>Xem chi tiết</Link>}
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
