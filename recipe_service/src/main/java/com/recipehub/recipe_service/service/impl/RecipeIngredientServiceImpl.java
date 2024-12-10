package com.recipehub.recipe_service.service.impl;

import com.recipehub.recipe_service.dto.IngredientDto;
import com.recipehub.recipe_service.dto.request.RecipeIngredientRequest;
import com.recipehub.recipe_service.exception.AppException;
import com.recipehub.recipe_service.exception.ErrorCode;
import com.recipehub.recipe_service.mapper.RecipeMapper;
import com.recipehub.recipe_service.model.Recipe;
import com.recipehub.recipe_service.model.RecipeIngredient;
import com.recipehub.recipe_service.repository.RecipeIngredientRepository;
import com.recipehub.recipe_service.repository.RecipeRepository;
import com.recipehub.recipe_service.repository.httpClient.IngredientClient;
import com.recipehub.recipe_service.service.RecipeIngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeIngredientServiceImpl implements RecipeIngredientService {
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final IngredientClient ingredientClient;
    private final RecipeRepository recipeRepository;
    private final RecipeMapper recipeMapper;

    @Override
    public RecipeIngredient createRecipeIngredient(RecipeIngredientRequest request) {
        IngredientDto ingredientDto = ingredientClient.getIngredient(request.getIngredientId());
        if (ingredientDto == null) {
            throw new AppException(ErrorCode.INGREDIENT_NOT_FOUND);
        }
        Recipe recipe = recipeRepository.findById(request.getRecipeId())
                .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_FOUND));
        RecipeIngredient recipeIngredient = recipeMapper.mapToRecipeIngredient(request, recipe);
        return recipeIngredientRepository.save(recipeIngredient);
    }

    @Override
    public RecipeIngredient getRecipeIngredientById(Long id) {
        return recipeIngredientRepository.findById(id).orElse(null);
    }

    @Override
    public List<RecipeIngredient> getAllRecipeIngredients() {
        return recipeIngredientRepository.findAll();
    }

    @Override
    public RecipeIngredient updateRecipeIngredient(Long id, RecipeIngredient recipeIngredient) {
        if (recipeIngredientRepository.existsById(id)) {
            recipeIngredient.setId(id);
            return recipeIngredientRepository.save(recipeIngredient);
        }
        return null;
    }

    @Override
    public void deleteRecipeIngredient(Long id) {
        recipeIngredientRepository.deleteById(id);
    }

    @Override
    public List<RecipeIngredient> getRecipeIngredientsByRecipeId(Long recipeId) {
        return recipeIngredientRepository.findByRecipeId(recipeId);
    }
}