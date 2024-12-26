import axios from "axios";

export const getRecipes = async (page, size = 10, categoryType = []) => {
    return await axios.get(`${API_BASE_URL}/recipes/search`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        page: page,
        size: size,
        categoryType: categoryType.join(","),
      },
    });
  };