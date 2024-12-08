package com.recipehub.recipe_service.service;

import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.RecipeDto;
import com.recipehub.recipe_service.dto.request.RecipeCreateRequest;
import com.recipehub.recipe_service.dto.request.RecipeUpdateRequest;

import java.util.List;


public interface RecipeService {
    RecipeDto getRecipe(Long id) throws Exception;
    List<RecipeDto> getAllRecipe();
    RecipeDto createRecipe(RecipeCreateRequest request) throws Exception;
    void deleteRecipe(Long recipeId);
    RecipeDto updateRecipe(Long id, RecipeUpdateRequest request);
    RecipeDto updateStatus(Long id, RecipeStatus status) throws Exception;
//    Page<Recipe> searchRecipes(String name, RecipeStatus status,
//                               int page, int size, String sortField, Sort.Direction sortDirection);
}