package com.recipehub.recipe_service.service.impl;

import com.recipehub.recipe_service.dto.response.CategoryResponse;
import com.recipehub.recipe_service.exception.AppException;
import com.recipehub.recipe_service.exception.ErrorCode;
import com.recipehub.recipe_service.model.RecipeCategory;
import com.recipehub.recipe_service.repository.RecipeCategoryRepository;
import com.recipehub.recipe_service.repository.httpClient.CategoryClient;
import com.recipehub.recipe_service.service.RecipeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RecipeCategoryServiceImpl implements RecipeCategoryService {
    private final RecipeCategoryRepository recipeCategoryRepository;
    private final CategoryClient categoryClient;

    @Override
    public RecipeCategory createRecipeCategory(RecipeCategory recipeCategory) {
        CategoryResponse categoryResponse = categoryClient.getCategoryById(recipeCategory.getCategoryId());
        if (categoryResponse == null) {
            throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
        }
        return recipeCategoryRepository.save(recipeCategory);
    }

    @Override
    public RecipeCategory getRecipeCategoryById(Long id) {
        return recipeCategoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<RecipeCategory> getAllRecipeCategories() {
        return recipeCategoryRepository.findAll();
    }

    @Override
    public RecipeCategory updateRecipeCategory(Long id, RecipeCategory recipeCategory) {
        if (recipeCategoryRepository.existsById(id)) {
            recipeCategory.setId(id);
            return recipeCategoryRepository.save(recipeCategory);
        }
        return null;
    }

    @Override
    public void deleteRecipeCategory(Long id) {
        recipeCategoryRepository.deleteById(id);
    }
}