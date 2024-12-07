package com.recipehub.recipe_service.mapper;

import com.recipehub.recipe_service.dto.request.IngredientCreationRequest;
import com.recipehub.recipe_service.dto.request.RecipeCreateRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IngredientMapper {
    IngredientCreationRequest toIngredientCreationRequest(RecipeCreateRequest request);
}
