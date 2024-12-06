package com.recipehub.ingredient_service.service;

import com.recipehub.ingredient_service.dto.request.IngredientRequest;
import com.recipehub.ingredient_service.dto.response.IngredientResponse;

import java.util.List;
import java.util.UUID;

public interface IngredientService {
    List<IngredientResponse> getAllIngredients();
    IngredientResponse getIngredientById(UUID id);
    IngredientResponse createIngredient(IngredientRequest request);
    IngredientResponse updateIngredient(UUID id, IngredientRequest request);
    void deleteIngredient(UUID id);

}
