import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipe } from "../service/recipeService";
import { getUserById } from "../service/userService";
import { jwtDecode } from "jwt-decode";
import { chatService } from "../service/chatService";
import { Comments } from "./Comments";
import WebSocketService from "../service/WebSocketService";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState([])
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const currentUserId = Number(decodedToken.sub);

  const commentWebSocketUrl = 'http://localhost:8085/ws'; // WebSocket URL for comment service
  const webSocketService = new WebSocketService(commentWebSocketUrl); 


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipe(id);
        if (response?.data) {
          setRecipe(response.data);
          console.log("hihih"recipe)
          const creatorResponse = await getUserById(response.data.createdBy);
          if (creatorResponse?.data) {
            setCreator(creatorResponse.data);
          }
        }
      } catch (error) {
        console.error("Không thể tải dữ liệu công thức!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);


  useEffect(() => {
    webSocketService.connect(
      {},
      () => {
        console.log('Connected to WebSocket');
        // Subscribe to the comment topic
        const commentSubscription = webSocketService.subscribe(
          `/topic/recipe-comments/${id}`,
          handleCommentWebSocketEvent
        );

        return () => {
          commentSubscription.unsubscribe();
          webSocketService.disconnect();
        };
      },
      (error) => console.error('WebSocket connection error:', error)
    );
  }, [id]);

  const handleCommentWebSocketEvent = async (event) => {
    switch (event.action) {
      case 'create':
        console.log("create event" + JSON.stringify(event.data))
        setComments((prev) => [event.data, ...prev]);
        console.log(comments)
        break;
      case 'update':
        setComments((prev) =>
          prev.map((c) => (c.id === event.data.id ? event.data : c))
        );
        break;
      case 'delete':
        setComments((prev) => prev.filter((c) => c.id !== event.data.id));
        break;
      default:
        console.warn('Unknown event type:', event.type);
    }
  };

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
          <Comments
          recipeId={recipe.id}
          userId={currentUserId}
          setShowLoginModal={() => navigate("/login")}
          comments={comments}
          setComments={setComments}
        />
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        ©2024 RecipeHub
      </footer>
    </div>
  );
};

export default RecipeDetails;
