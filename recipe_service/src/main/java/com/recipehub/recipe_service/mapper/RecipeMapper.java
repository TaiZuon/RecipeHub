package com.recipehub.recipe_service.mapper;


import com.recipehub.recipe_service.Enum.RecipeStatus;
import com.recipehub.recipe_service.dto.RecipeDto;
import com.recipehub.recipe_service.dto.RecipeImageDto;
import com.recipehub.recipe_service.dto.request.RecipeCreateRequest;
import com.recipehub.recipe_service.dto.request.RecipeRequest;
import com.recipehub.recipe_service.exception.AppException;
import com.recipehub.recipe_service.exception.ErrorCode;

import com.recipehub.recipe_service.model.Recipe;
import com.recipehub.recipe_service.model.RecipeImage;
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
        recipe.setInstructions(request.getInstructions());
        recipe.setStatus(RecipeStatus.PENDING);
        recipe.setCreatedBy(request.getCreatedBy());


        return recipe;
    }


    public RecipeDto recipeToRecipeDto (Recipe recipe) {
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setId(recipe.getId());
        recipeDto.setTitle(recipe.getTitle());
        recipeDto.setDescription(recipe.getDescription());
        recipeDto.setInstructions(recipe.getInstructions());
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

}
