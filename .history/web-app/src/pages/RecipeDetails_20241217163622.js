import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipe } from "../service/recipeService";
import { getUserById } from "../service/userService";
import { jwtDecode } from "jwt-decode";
import { chatService } from "../service/chatService";
import Comme

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const currentUserId = decodedToken.sub;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipe(id);
        if (response?.data) {
          setRecipe(response.data);

          const creatorResponse = await getUserById(response.data.createdBy);
          if (creatorResponse?.data) {
            setCreator(creatorResponse.data);
          }
          // console.log(response.data);
        }
      } catch (error) {
        console.error("Không thể tải dữ liệu công thức!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChatClick = async () => {
    try {

      const room = await chatService.getOrCreateRoom(currentUserId, creator.id);
      navigate(`/chat?roomId=${room.id}`);
    } catch (error) {
      console.error("Error creating or getting chat room:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  if (!recipe) {
    return <p className="text-center mt-10">Không tìm thấy công thức!</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 text-lg font-semibold">
          RecipeHub
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>

          <p className="mb-4">
            <strong className="font-semibold">Mô tả:</strong> {recipe.description}
          </p>

          <p className="mb-4">
            <strong className="font-semibold">Người tạo:</strong> {creator ? creator.username : "Đang tải..."}
          </p>

          <p className="mb-4 font-semibold">Hình ảnh:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recipe.recipeImages.map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={item.imageUrl}
                  alt={recipe.name}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
            <button
              className="bg-green-500 text-white p-2 rounded"
              onClick={handleChatClick}
            >
              Chat
            </button>
          </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        ©2024 RecipeHub
      </footer>
    </div>
  );
};

export default RecipeDetails;
