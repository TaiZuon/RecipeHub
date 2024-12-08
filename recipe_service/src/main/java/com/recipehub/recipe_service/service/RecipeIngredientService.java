package com.recipehub.recipe_service.service;

import com.recipehub.recipe_service.model.RecipeIngredient;

import java.util.List;

public interface RecipeIngredientService {
    RecipeIngredient createRecipeIngredient(RecipeIngredient recipeIngredient);
    RecipeIngredient getRecipeIngredientById(Long id);
    List<RecipeIngredient> getAllRecipeIngredients();
    RecipeIngredient updateRecipeIngredient(Long id, RecipeIngredient recipeIngredient);
    void deleteRecipeIngredient(Long id);
}