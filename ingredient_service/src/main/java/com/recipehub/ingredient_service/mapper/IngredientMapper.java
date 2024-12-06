package com.recipehub.ingredient_service.mapper;

import com.recipehub.ingredient_service.dto.request.IngredientRequest;
import com.recipehub.ingredient_service.dto.response.IngredientResponse;
import com.recipehub.ingredient_service.model.Ingredient;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IngredientMapper {
    IngredientResponse toResponse(Ingredient ingredient);
    Ingredient toEntity(IngredientRequest request);
}
