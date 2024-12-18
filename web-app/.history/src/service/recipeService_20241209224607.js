import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

export const getRecipes = async (page, size = 5, categoryType = [], title) => {
    return await axios.get(`${API_BASE_URL}/recipes/search`, {
      
      params: {
        page: page,
        size: size,
        categoryType: categoryType.join(","),
        title: title
      },
    });
  };