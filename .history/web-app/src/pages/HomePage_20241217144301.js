import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import RecipeCard from "../components/RecipeCard";
import { getRecipes } from "../service/recipeService";
import axios from "axios";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ page: 1, size: 6 });
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchMethod, setSearchMethod] = useState("dishName");
  const [dishName, setDishName] = useState("");
  const observer = useRef();
  const lastPostElementRef = useRef();

  const navigate = useNavigate();

  // const loadRecipes = async (page) => {
  //   setLoading(true);
  //   try {
  //     const response = await getRecipes(page, 6);
  //     const data = response?.data?.data || [];
  //     setTotalPages(response?.data?.totalPages || 0);
  //     setRecipes((prevRecipes) => [...prevRecipes, ...data]);
  //     setHasMore(data.length > 0);
  //   } catch (error) {
  //     if (error.response?.status === 401) {
  //       navigate("/login");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
      fetchPendingRecipes();
    }, []);
    
  const fetchPendingRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8082/api/recipes/status", {
        params: { status: "PENDING" }
      });
      setRecipes(response.data);
      console.log(recipes)
    } catch (error) {
      console.error("Error fetching pending recipes:", error);
      // alert("Error fetching pending recipes");
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
    setPage(1);
    setRecipes([]);

    try {
      setLoading(true);
      let response;
      if (searchMethod !== "dishName") {
        response = await axios.post(`http://localhost:8082/api/predict/dish`, {
          dishName,
          modelType: searchMethod,
        });
        const result = response.data;
        const recipe = {
          title: dishName,
          ingredients: result.Ingredients,
          instructions: result.Instructions,
        };

        setRecipes([recipe]);
      }
      setHasMore(false);
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
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-5">
        <div className="mb-5 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="dishName"
                value="dishName"
                checked={searchMethod === "dishName"}
                onChange={(e) => {
                  setSearchMethod(e.target.value);
                  setRecipes([]);
                }}
                className="mr-2"
              />
              <label htmlFor="dishName" className="text-sm">Tìm theo tên món ăn</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="decision_tree"
                value="decision_tree"
                checked={searchMethod === "decision_tree"}
                onChange={(e) => {
                  setSearchMethod(e.target.value);
                  setRecipes([]);
                }}
                className="mr-2"
              />
              <label htmlFor="decision_tree" className="text-sm">Decision Tree</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="naive_bayes"
                value="naive_bayes"
                checked={searchMethod === "naive_bayes"}
                onChange={(e) => {
                  setSearchMethod(e.target.value);
                  setRecipes([]);
                }}
                className="mr-2"
              />
              <label htmlFor="naive_bayes" className="text-sm">Naive Bayes</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="knn"
                value="knn"
                checked={searchMethod === "knn"}
                onChange={(e) => {
                  setSearchMethod(e.target.value);
                  setRecipes([]);
                }}
                className="mr-2"
              />
              <label htmlFor="knn" className="text-sm">KNN</label>
            </div>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nhập tên món ăn..."
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
            <button
              onClick={onSearch}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Đang tải...</p>
          ) : Array.isArray(recipes) && recipes.length > 0 ? (
            recipes.map((recipe, index) => {
              if (recipes.length === index + 1) {
                return (
                  <div
                    key={recipe.title}
                    ref={lastPostElementCallback}
                    className="border p-4 rounded shadow"
                  >
                    {searchMethod === "dishName" ? (
                      <RecipeCard recipe={recipe} />
                    ) : (
                      <div>
                        <h2 className="text-lg font-bold">{recipe.title}</h2>
                        <h3 className="mt-2 font-semibold">Nguyên liệu:</h3>
                        <ul className="list-disc list-inside">
                          {(recipe.ingredients || []).map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                        <h3 className="mt-2 font-semibold">Hướng dẫn:</h3>
                        <p>{recipe.instructions || "Không có hướng dẫn"}</p>
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={recipe.title} className="border p-4 rounded shadow">
                    {searchMethod === "dishName" ? (
                      <RecipeCard recipe={recipe} />
                    ) : (
                      <div>
                        <h2 className="text-lg font-bold">{recipe.title}</h2>
                        <h3 className="mt-2 font-semibold">Nguyên liệu:</h3>
                        <ul className="list-disc list-inside">
                          {(recipe.ingredients || []).map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                        <h3 className="mt-2 font-semibold">Hướng dẫn:</h3>
                        <p>{recipe.instructions || "Không có hướng dẫn"}</p>
                      </div>
                    )}
                  </div>
                );
              }
            })
          ) : (
            <p>Không có công thức nào để hiển thị.</p>
          )}
        </div>
      </main>
      <footer className="text-center py-4 border-t">©2024 RecipeHub</footer>
    </div>
  );
};

export default HomePage;
