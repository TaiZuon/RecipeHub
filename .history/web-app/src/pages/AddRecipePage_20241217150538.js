import React, { useState, useEffect } from "react";
import AppHeader from "../components/AppHeader";
import axios from "axios";
import fileUtils from "../utils/fileUtils";
import { jwtDecode } from "jwt-decode";
import { getIngredients, getIngredientByName } from "../service/ingredientService";
import { createRecipeIngredient } from "../service/recipeService";

const AddRecipePage = () => {
  const [fileList, setFileList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await getIngredients();
        setIngredients(response.data);
      } catch (error) {
        console.error("Không thể tải dữ liệu nguyên liệu!");
      }
    };

    fetchIngredients();
  }, []);

  const handleChange = (e) => setFileList(e.target.files);

  const onFinish = async (e) => {
    e.preventDefault();
    const values = new FormData(e.target);
    const token = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;

    const imageUrls = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      try {
        const imageUrl = await fileUtils.uploadImage(file, `recipes/${userId}`);
        imageUrls.push({ imageUrl, isPrimary: i === 0 });
      } catch (error) {
        console.error("Error: ", error);
        return;
      }
    }

    const recipeRequest = {
      title: values.get("title"),
      description: values.get("description"),
      createdBy: userId,
      status: "PENDING",
      imageUrls,
    };

    try {
      const response = await axios.post("http://localhost:8082/api/recipes", recipeRequest);
      for (const ingredient of selectedIngredients) {
        const ingredientResponse = await getIngredientByName(ingredient);
        const recipeIngredient = { recipeId: response.data.id, ingredientId: ingredientResponse.data.id };
        await createRecipeIngredient(recipeIngredient);
      }
      // console.log("Received values: ", response.data);
      alert("Công thức đã được thêm thành công!");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleAddIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prev) => [...prev, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients((prev) => prev.filter((item) => item !== ingredient));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow p-4 max-w-md mx-auto">
        <h1 className="text-center text-2xl mb-4">Thêm công thức</h1>
        <form onSubmit={onFinish} className="space-y-4">
          <div>
            <label className="block mb-1">Tên công thức</label>
            <input
              type="text"
              name="title"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Mô tả</label>
            <textarea
              name="description"
              required
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <div>
            <label className="block mb-1">Nguyên liệu đã chọn</label>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <button
                  key={ingredient}
                  type="button"
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  {ingredient} ✕
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1">Nguyên liệu</label>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <button
                  key={ingredient.id}
                  type="button"
                  onClick={() => handleAddIngredient(ingredient.name)}
                  className={`px-2 py-1 rounded ${selectedIngredients.includes(ingredient.name) ? "bg-gray-300" : "bg-blue-500 text-white"}`}
                >
                  {ingredient.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1">Hình ảnh</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Thêm công thức
          </button>
        </form>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        ©2024 RecipeHub
      </footer>
    </div>
  );
};

export default AddRecipePage;