import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { getRecipes } from "../service/recipeService";

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
        console.log("hihih" + result);
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
      <main className="flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setSearchMethod("dishName")}
              className={`px-4 py-2 rounded ${searchMethod === "dishName" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Tìm theo tên món ăn
            </button>
            <button
              onClick={() => setSearchMethod("decision_tree")}
              className={`px-4 py-2 rounded ${searchMethod === "decision_tree" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Decision Tree
            </button>
            <button
              onClick={() => setSearchMethod("naive_bayes")}
              className={`px-4 py-2 rounded ${searchMethod === "naive_bayes" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Naive Bayes
            </button>
            <button
              onClick={() => setSearchMethod("knn")}
              className={`px-4 py-2 rounded ${searchMethod === "knn" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              KNN
            </button>
          </div>
          <input
            type="text"
            placeholder="Nhập tên món ăn..."
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="p-2 border rounded w-1/2"
          />
          <button
            onClick={onSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Tìm kiếm
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Đang tải...</p>
          ) : Array.isArray(recipes) && recipes.length > 0 ? (
            recipes.map((recipe, index) => {
              if (recipes.length === index + 1) {
                return (
                  <div key={recipe.title} ref={lastPostElementCallback}>
                    {searchMethod === "dishName" ? (
                      <RecipeCard recipe={recipe} />
                    ) : (
                      <div className="bg-white rounded-lg shadow-lg p-4">
                        <himport React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { getRecipes } from "../service/recipeService";

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
        console.log("hihih" + result);
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
      <main className="flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setSearchMethod("dishName")}
              className={`px-4 py-2 rounded ${searchMethod === "dishName" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Tìm theo tên món ăn
            </button>
            <button
              onClick={() => setSearchMethod("decision_tree")}
              className={`px-4 py-2 rounded ${searchMethod === "decision_tree" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Decision Tree
            </button>
            <button
              onClick={() => setSearchMethod("naive_bayes")}
              className={`px-4 py-2 rounded ${searchMethod === "naive_bayes" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Naive Bayes
            </button>
            <button
              onClick={() => setSearchMethod("knn")}
              className={`px-4 py-2 rounded ${searchMethod === "knn" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              KNN
            </button>
          </div>
          <input
            type="text"
            placeholder="Nhập tên món ăn..."
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="p-2 border rounded w-1/2"
          />
          <button
            onClick={onSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Tìm kiếm
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Đang tải...</p>
          ) : Array.isArray(recipes) && recipes.length > 0 ? (
            recipes.map((recipe, index) => {
              if (recipes.length === index + 1) {
                return (
                  <div key={recipe.title} ref={lastPostElementCallback}>
                    {searchMethod === "dishName" ? (
                      <RecipeCard recipe={recipe} />
                    ) : (
                      <div className="bg-white rounded-lg shadow-lg p-4">
                        <h