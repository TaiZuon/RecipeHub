package com.recipehub.ingredient_service.service;

import com.recipehub.ingredient_service.dto.IngredientDto;
import com.recipehub.ingredient_service.dto.request.IngredientRequest;
import com.recipehub.ingredient_service.dto.request.IngredientUpdateRequest;
import com.recipehub.ingredient_service.model.Ingredient;

import java.util.List;
import java.util.UUID;

public interface IngredientService {
    IngredientDto getIngredient(Long id) throws Exception;
    List<IngredientDto> getAllIngredients();
    Ingredient createIngredient(IngredientRequest request) throws Exception;
    void deleteIngredient(Long ingredientId);
    IngredientDto updateIngredient(Long id, IngredientUpdateRequest request);
    IngredientDto getIngredientByName(String name) throws Exception;

//    Page<Ingredient> searchIngredients(String name, IngredientStatus status,
//                                       int page, int size, String sortField, Sort.Direction sortDirection);
}