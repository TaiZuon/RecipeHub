package com.recipehub.recipe_service.service;

import com.recipehub.recipe_service.Enum.CategoryType;
import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.RecipeDto;
import com.recipehub.recipe_service.dto.request.RecipeCreateRequest;
import com.recipehub.recipe_service.dto.request.RecipeUpdateRequest;
import com.recipehub.recipe_service.dto.response.PageResponse;
import com.recipehub.recipe_service.dto.response.RecipeResponse;

import java.util.List;


public interface RecipeService {
    RecipeDto getRecipe(Long id) throws Exception;
    PageResponse<RecipeResponse> getAllRecipe(int page, int size, List<CategoryType> categoryType, String title);
    RecipeDto createRecipe(RecipeCreateRequest request) throws Exception;
    void deleteRecipe(Long recipeId);
    RecipeDto updateRecipe(Long id, RecipeUpdateRequest request);
    RecipeDto updateStatus(Long id, RecipeStatus status) throws Exception;
    void approveRecipe(Long recipeId);
    void rejectRecipe(Long recipeId);
    List<RecipeResponse> getRecipesByStatus(RecipeStatus status);

//    Page<Recipe> searchRecipes(String name, RecipeStatus status,
//                               int page, int size, String sortField, Sort.Direction sortDirection);
}