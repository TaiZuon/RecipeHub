import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

export const getRecipes = async (page, size = 6) => {
    return await axios.get(`${API_BASE_URL}/recipes/search`, {
      
      params: {
        page: page,
        size: size
      },
    });
  };

  
export const getRecipe = async (id) => {
  return await axios.get(`${API_BASE_URL}/recipes/${id}`);
};

export const createRecipeIngredient = async (recipeIngredient) => {
  return await axios.post(`${API_BASE_URL}/recipe_ingredients`, recipeIngredient
  );
};