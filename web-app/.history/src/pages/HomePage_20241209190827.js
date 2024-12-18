import React, { useEffect, useState, useRef  } from "react";
import { Layout, Card, Input, Row, Col, message } from "antd";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

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
      console.log("data:", response);
      setRecipes(Array.isArray(data) ? data : []);    } 
      catch (error) {
      message.error("Không thể tải dữ liệu công thức!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes(page);
  }, [searchParams]);

  const loadRecipes = (page) => {
    console.log(`loading recipes for page ${page}`);
    setLoading(true);
    fetchRecipes(page)
      .then((response) => {
        setTotalPages(response.data.data.totalPages);
        setRecipes((prevRecipes) => [...prevRecipes, ...response.data.data]);
        setHasMore(response.data.data.length > 0);
        console.log(response.data.data.length > 0);
        console.log("loaded recipes:", response.data.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
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
  useEffect(() => {
    if (!hasMore) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    });
    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }

    setHasMore(false);
  }, [hasMore]);

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
          {/* {loading ? (
            <p>Đang tải...</p>
          ) : ({
            
          }
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
          )} */}
          {recipes.map((recipe, index) => {
            if (recipes.length === index + 1) {
              return (
                <Col span={8} key={recipe.id}>
                <Card
                  title={recipe.name}
                  extra={<Link to={`/recipe/${recipe.id}`}>Xem chi tiết</Link>}
                >
                  
                  {recipe.description}
                </Card>
              </Col>
              );
            } else {
              return <RecipeCard key={recipe.id} recipe={recipe} />;
            }
          })}
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default HomePage;
