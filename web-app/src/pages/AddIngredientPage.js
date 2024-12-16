import React, { useState } from "react";
import AppHeader from "../components/AppHeader";
import axios from "axios";
import fileUtils from "../utils/fileUtils";
import { jwtDecode } from "jwt-decode";

const AddIngredientPage = () => {
  const [fileList, setFileList] = useState([]);

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
        const imageUrl = await fileUtils.uploadImage(file, `ingredients/${userId}`);
        imageUrls.push({ imageUrl, isPrimary: i === 0 });
      } catch (error) {
        console.error("Error: ", error);
        return;
      }
    }

    const ingredientRequest = {
      name: values.get("ingredientName"),
      imageUrls,
    };

    try {
      const response = await axios.post("http://localhost:8081/api/ingredients", ingredientRequest);
      console.log("Received values: ", response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow p-4 max-w-md mx-auto">
        <h1 className="text-center text-2xl mb-4">Thêm nguyên liệu</h1>
        <form onSubmit={onFinish} className="space-y-4">
          <div>
            <label className="block mb-1">Tên nguyên liệu</label>
            <input
              type="text"
              name="ingredientName"
              required
              className="w-full p-2 border rounded"
            />
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
            Thêm nguyên liệu
          </button>
        </form>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        ©2024 RecipeHub
      </footer>
    </div>
  );
};

export default AddIngredientPage;