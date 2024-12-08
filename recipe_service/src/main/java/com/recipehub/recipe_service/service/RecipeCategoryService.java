package com.recipehub.recipe_service.service;

import com.recipehub.recipe_service.model.RecipeCategory;

import java.util.List;

public interface RecipeCategoryService {
    RecipeCategory createRecipeCategory(RecipeCategory recipeCategory);
    RecipeCategory getRecipeCategoryById(Long id);
    List<RecipeCategory> getAllRecipeCategories();
    RecipeCategory updateRecipeCategory(Long id, RecipeCategory recipeCategory);
    void deleteRecipeCategory(Long id);
}