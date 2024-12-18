package com.recipehub.recipe_service.mapper;


import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.IngredientDto;
import com.recipehub.recipe_service.dto.RecipeDto;
import com.recipehub.recipe_service.dto.RecipeImageDto;
import com.recipehub.recipe_service.dto.request.RecipeCreateRequest;

import com.recipehub.recipe_service.dto.request.RecipeIngredientRequest;
import com.recipehub.recipe_service.dto.response.RecipeIngredientResponse;
import com.recipehub.recipe_service.dto.response.RecipeResponse;
import com.recipehub.recipe_service.model.Recipe;
import com.recipehub.recipe_service.model.RecipeImage;
import com.recipehub.recipe_service.model.RecipeIngredient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RecipeMapper {

    public RecipeImage recipeImageDtoToRecipeImage(RecipeImageDto recipeImageDto) {
        RecipeImage recipeImage = new RecipeImage();
        recipeImage.setImageUrl(recipeImageDto.getImageUrl());
        recipeImage.setPrimary(recipeImageDto.getIsPrimary());

        return recipeImage;
    }
    public RecipeImageDto recipeImageToRecipeImageDto(RecipeImage recipeImage) {
        return RecipeImageDto.builder()
                .imageUrl(recipeImage.getImageUrl())
                .isPrimary(recipeImage.isPrimary())
                .build();
    }


    public Recipe recipeCreateToRecipe(RecipeCreateRequest request) {
//        User seller = userRepository.findById(request.getSellerId())
//                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Recipe recipe = new Recipe();
        recipe.setTitle(request.getTitle());
        recipe.setDescription(request.getDescription());
        recipe.setStatus(RecipeStatus.PENDING);
        recipe.setCreatedBy(request.getCreatedBy());


        return recipe;
    }


    public RecipeDto recipeToRecipeDto (Recipe recipe) {
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setId(recipe.getId());
        recipeDto.setTitle(recipe.getTitle());
        recipeDto.setDescription(recipe.getDescription());
        recipeDto.setStatus(recipe.getStatus());
        recipeDto.setCreatedBy(recipe.getCreatedBy());


        List<RecipeImage> recipeImages = recipe.getRecipeImages();
        if (recipeImages != null && !recipeImages.isEmpty()) {
            List<RecipeImageDto> recipeImageDtoList = recipeImages.stream()
                    .map(this::recipeImageToRecipeImageDto)
                    .collect(Collectors.toList());
            recipeDto.setRecipeImages(recipeImageDtoList);
        }

        return recipeDto;
    }

    public RecipeResponse toPostResponse(Recipe recipe) {
        RecipeResponse recipeResponse = new RecipeResponse();
        recipeResponse.setRecipeId(recipe.getId());
        recipeResponse.setTitle(recipe.getTitle());
        recipeResponse.setDescription(recipe.getDescription());
        recipeResponse.setStatus(recipe.getStatus());
        recipeResponse.setCreatedBy(recipe.getCreatedBy());
        recipeResponse.setCreatedAt(recipe.getCreatedAt());
        recipeResponse.setUpdatedAt(recipe.getUpdatedAt());

        List<RecipeImage> recipeImages = recipe.getRecipeImages();
        if (recipeImages != null && !recipeImages.isEmpty()) {
            List<RecipeImageDto> recipeImageDtoList = recipeImages.stream()
                    .map(this::recipeImageToRecipeImageDto)
                    .collect(Collectors.toList());
            recipeResponse.setRecipeImages(recipeImageDtoList);
        }

        return recipeResponse;
    }

    public RecipeIngredient mapToRecipeIngredient(RecipeIngredientRequest request, Recipe recipe) {
        return RecipeIngredient.builder()
                .recipe(recipe)
                .ingredientId(request.getIngredientId())
                .build();
    }
}
