package com.recipehub.recipe_service.service;

import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.RecipeDto;
import com.recipehub.recipe_service.dto.request.RecipeCreateRequest;
import com.recipehub.recipe_service.dto.request.RecipeUpdateRequest;
import com.recipehub.recipe_service.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.UUID;

public interface RecipeService {
    RecipeDto getRecipe(UUID id) throws Exception;
    List<RecipeDto> getAllRecipe();
    Recipe createRecipe(RecipeCreateRequest request) throws Exception;
    void deleteRecipe(UUID recipeId);
    RecipeDto updateRecipe(UUID id, RecipeUpdateRequest request);
    RecipeDto updateStatus(UUID id, RecipeStatus status) throws Exception;
//    Page<Recipe> searchRecipes(String name, RecipeStatus status,
//                               int page, int size, String sortField, Sort.Direction sortDirection);
}