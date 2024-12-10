package com.recipehub.recipe_service.service;

import com.recipehub.recipe_service.dto.request.RecipeIngredientRequest;
import com.recipehub.recipe_service.model.RecipeIngredient;

import java.util.List;

public interface RecipeIngredientService {
    RecipeIngredient createRecipeIngredient(RecipeIngredientRequest request);
    RecipeIngredient getRecipeIngredientById(Long id);
    List<RecipeIngredient> getAllRecipeIngredients();
    RecipeIngredient updateRecipeIngredient(Long id, RecipeIngredient recipeIngredient);
    void deleteRecipeIngredient(Long id);
    List<RecipeIngredient> getRecipeIngredientsByRecipeId(Long recipeId);

}