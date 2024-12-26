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

@PostMapping
    public ResponseEntity<RecipeIngredient> createRecipeIngredient(@RequestBody RecipeIngredient recipeIngredient) {
        return ResponseEntity.ok(recipeIngredientService.createRecipeIngredient(recipeIngredient));
    }