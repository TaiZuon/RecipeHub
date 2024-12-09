import React, { useEffect, useState, useRef, useCallback } from "react";
import { Layout, Card, Input, Row, Col, Button, Select, Radio } from "antd";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { getRecipes } from "../service/recipeService";

const { Content, Footer } = Layout;
const { Search } = Input;
const { Option } = Select;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ page: 1, size: 6 });
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchMethod, setSearchMethod] = useState("dishName"); // Default search method
  const [dishName, setDishName] = useState(""); // Track the dish name entered
  const observer = useRef();
  const lastPostElementRef = useRef();

  const navigate = useNavigate();

  const loadRecipes = async (page) => {
    console.log(`loading recipes for page ${page}`);
    setLoading(true);
    try {
      const response = await getRecipes(page, 6);
      const data = response?.data?.data || [];
      console.log(data);
      setTotalPages(response?.data?.totalPages || 0);
      setRecipes((prevRecipes) => [...prevRecipes, ...data]);
      setHasMore(data.length > 0);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes(page);
  }, [page]);

  const onSearch = async () => {
    if (!dishName) {
      alert("Vui lòng nhập tên món ăn.");
      return;
    }

    setSearchParams({ ...searchParams, page: 1 });
    setPage(1); // Reset page to 1 when searching
    setRecipes([]); // Clear previous recipes

    try {
      setLoading(true);
      let response;
      // Điều chỉnh logic tìm kiếm dựa trên phương thức đã chọn
      if (searchMethod === "dishName") {
        response = await axios.post(
          `http://localhost:8082/api/predict/dish`,
          { dishName, modelType: "" } // search by dish name
        );
        const result = response.data; // Giả sử kết quả trả về là một danh sách các công thức
        setRecipes(result.recipes); // Giả sử kết quả có một thuộc tính "recipes"
      } else {
        response = await axios.post(
          `http://localhost:8082/api/predict/dish`,
          { dishName, modelType: searchMethod } // search by model type with dish name
        );
        const result = response.data; // Đây là phần cấu trúc trả về từ mô hình học máy
        const recipe = {
          title: dishName,
          ingredients: result.Ingredients,
          instructions: result.Instructions,
        };
        setRecipes([recipe]); // Giả sử bạn chỉ nhận được một công thức từ mô hình
      }
      setHasMore(false); // Set hasMore to false if you're not paginating
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  const lastPostElementCallback = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px" }}>
        <Input.Group compact style={{ marginBottom: "20px" }}>
          <Radio.Group
            value={searchMethod}
            onChange={(e) => {
              setSearchMethod(e.target.value);
              setRecipes([]);
            }}
            style={{ marginRight: "20px" }}
          >
            <Radio.Button value="dishName">Tìm theo tên món ăn</Radio.Button>
            <Radio.Button value="decision_tree">Decision Tree</Radio.Button>
            <Radio.Button value="naive_bayes">Naive Bayes</Radio.Button>
            <Radio.Button value="knn">KNN</Radio.Button>
          </Radio.Group>
          <Search
            placeholder="Nhập tên món ăn..."
            onSearch={onSearch}
            enterButton
            style={{ width: "50%" }}
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
          />
        </Input.Group>
        <Row gutter={[16, 16]}>
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            recipes.map((recipe, index) => {
              if (recipes.length === index + 1) {
                return (
                  <Col
                    span={8}
                    key={recipe.title} // Sử dụng title làm key vì đây là món ăn duy nhất từ mô hình
                    ref={lastPostElementCallback}
                  >
                    {searchMethod === "dishName" ? (
                      <RecipeCard recipe={recipe} />
                    ) : (
                      <Card
                        title={recipe.title}
                        extra={
                          <Link to={`/recipe/${recipe.title}`}>
                            Xem chi tiết
                          </Link>
                        }
                      >
                        <h3>Nguyên liệu:</h3>
                        <ul>
                          {recipe.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                        <h3>Hướng dẫn:</h3>
                        <p>{recipe.instructions}</p>
                      </Card>
                    )}
                  </Col>
                );
              } else {
                return (
                  <Col span={8} key={recipe.title}>
                    {searchMethod === "dishName" ? (
                      <RecipeCard recipe={recipe} />
                    ) : (
                      <Card
                        title={recipe.title}
                        extra={
                          <Link to={`/recipe/${recipe.title}`}>
                            Xem chi tiết
                          </Link>
                        }
                      >
                        <h3>Nguyên liệu:</h3>
                        <ul>
                          {recipe.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                        <h3>Hướng dẫn:</h3>
                        <p>{recipe.instructions}</p>
                      </Card>
                    )}
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
